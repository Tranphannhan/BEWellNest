const axios = require('axios');
const crypto = require('crypto');
const momoConfig = require('../config/momo');
const Connect_Donthuoc = require("../Model/Don_Thuoc");
const Connect_Data_Model = new Connect_Donthuoc();
const connectDB = require("../Model/Db");
const Donthuoc = require("../Schema/Don_Thuoc"); 

exports.createPayment = async (req, res) => {
  try {
    const { amount, orderInfo, url, Id_DonThuoc } = req.body;

    const redirectUrl = url || momoConfig.redirectUrl;

    const orderId = momoConfig.partnerCode + new Date().getTime(); // orderId phải unique
    const requestId = orderId;

    // ✅ rawSignature phải chứa đúng các giá trị gửi đi
    const rawSignature = 
      `accessKey=${momoConfig.accessKey}` +
      `&amount=${amount}` +
      `&extraData=${Id_DonThuoc}` +
      `&ipnUrl=${momoConfig.ipnUrl}` +
      `&orderId=${orderId}` +
      `&orderInfo=${orderInfo}` +
      `&partnerCode=${momoConfig.partnerCode}` +
      `&redirectUrl=${redirectUrl}` +
      `&requestId=${requestId}` +
      `&requestType=${momoConfig.requestType}`;

    const signature = crypto.createHmac('sha256', momoConfig.secretKey)
      .update(rawSignature)
      .digest('hex');

    const body = {
      partnerCode: momoConfig.partnerCode,
      partnerName: "Test",
      storeId: "MomoTestStore",
      requestId,
      amount: Number(amount),
      orderId,
      orderInfo,
      redirectUrl,
      ipnUrl: momoConfig.ipnUrl,
      requestType: momoConfig.requestType,
      extraData: Id_DonThuoc, // ✅ Trùng với extraData trong rawSignature
      lang: "vi",
      autoCapture: true,
      signature,
    };

    const response = await axios.post(momoConfig.endpoint, body, {
      headers: { 'Content-Type': 'application/json' },
    });

    return res.status(200).json(response.data); // Trả về payUrl cho FE chuyển hướng
  } catch (error) {
    console.error('Payment error:', error.response?.data || error.message);
    return res.status(500).json({
      message: 'Lỗi khi tạo đơn thanh toán',
      error: error.response?.data || error.message,
    });
  }
};

exports.handleCallback = async (req, res) => {
  const result = req.body;
  const id = result.extraData;

  console.log('📩 Momo callback received:', result);
  console.log('🧾 Id_DonThuoc từ extraData:', id);

  try {
 
      console.log('✅ Thanh toán thành công. Gửi yêu cầu xác nhận...');

      await connectDB();

      const Check_Donthuoc = await Donthuoc.findByIdAndUpdate(
        '685e2266f80a121de596ce55',
        { $set: { TrangThaiThanhToan: true } },
        { new: true }
      );

      if (!Check_Donthuoc) {
        return res.status(404).json({ message: 'Không tìm thấy đơn thuốc để cập nhật' });
      }

      console.log(`✅ Đã cập nhật trạng thái thanh toán đơn thuốc ${id}`);
      return res.status(200).json({
        message: '✅ Đã cập nhật trạng thái đơn thuốc thành công',
        data: Check_Donthuoc
      });

      console.warn(`❌ Giao dịch thất bại. orderId: ${result.orderId}`);
      return res.status(200).json({ message: 'Giao dịch thất bại từ MoMo' });

  } catch (error) {
    console.error('❌ Lỗi xử lý callback:', error);
    return res.status(500).json({ message: 'Lỗi server khi xác nhận thanh toán' });
  }
};


