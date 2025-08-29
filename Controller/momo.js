const axios = require('axios');
const crypto = require('crypto');
const momoConfig = require('../config/momo');

const Connect_Phieu_Kham_Benh = require("../Model/Phieu_Kham_Benh");
const PhieuKhamBenh = new Connect_Phieu_Kham_Benh();

const Connect_Select_Yeu_Cau_Xet_Nghiem = require("../Model/Yeu_Cau_Xet_Nghiem");
const XetNghiem_M = new Connect_Select_Yeu_Cau_Xet_Nghiem();

const connectDB = require("../Model/Db");
const Donthuoc = require("../Schema/Don_Thuoc"); 

// exports.createPayment = async (req, res) => {
//   try {
//     const { amount, orderInfo, url, Id, Type} = req.body;

//     const redirectUrl = url || momoConfig.redirectUrl;

//     const orderId = momoConfig.partnerCode + new Date().getTime(); // orderId phải unique
//     const requestId = orderId;

//     // ✅ rawSignature phải chứa đúng các giá trị gửi đi
//     const rawSignature = 
//       `accessKey=${momoConfig.accessKey}` +
//       `&amount=${amount}` +
//       `&extraData=${Id}` +
//       `&ipnUrl=${momoConfig.ipnUrl}` +
//       `&orderId=${orderId}` +
//       `&orderInfo=${orderInfo}` +
//       `&partnerCode=${momoConfig.partnerCode}` +
//       `&redirectUrl=${redirectUrl}` +
//       `&requestId=${requestId}` +
//       `&requestType=${momoConfig.requestType}`;

//     const signature = crypto.createHmac('sha256', momoConfig.secretKey)
//       .update(rawSignature)
//       .digest('hex');

//     const body = {
//       partnerCode: momoConfig.partnerCode,
//       partnerName: "Test",
//       storeId: "MomoTestStore",
//       requestId,
//       amount: Number(amount),
//       orderId,
//       orderInfo,
//       redirectUrl,
//       ipnUrl: momoConfig.ipnUrl,
//       requestType: momoConfig.requestType,
//       extraData: Id, // ✅ Trùng với extraData trong rawSignature
//       lang: "vi",
//       autoCapture: true,
//       signature,
//     };

//     const response = await axios.post(momoConfig.endpoint, body, {
//       headers: { 'Content-Type': 'application/json' },
//     });

//     return res.status(200).json(response.data); // Trả về payUrl cho FE chuyển hướng
//   } catch (error) {
//     console.error('Payment error:', error.response?.data || error.message);
//     return res.status(500).json({
//       message: 'Lỗi khi tạo đơn thanh toán',
//       error: error.response?.data || error.message,
//     });
//   }
// };


exports.createPayment = async (req, res) => {
  try {
    const { amount, orderInfo, url, Id, Type } = req.body;

    const redirectUrl = url || momoConfig.redirectUrl;
    const orderId = momoConfig.partnerCode + new Date().getTime();
    const requestId = orderId;

    // 👉 Gộp Id và Type thành extraData JSON string
    const extraData = JSON.stringify({ Id, Type });

    const rawSignature =
      `accessKey=${momoConfig.accessKey}` +
      `&amount=${amount}` +
      `&extraData=${extraData}` +
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
      extraData, 
      lang: "vi",
      autoCapture: true,
      signature,
    };

    const response = await axios.post(momoConfig.endpoint, body, {
      headers: { 'Content-Type': 'application/json' },
    });

    return res.status(200).json(response.data);
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
  const extraData = result.extraData;

  console.log('📩 Momo callback received:', result);
  console.log('🧾 ExtraData:', extraData);

  try {
    await connectDB();

    const { Id: id, Type: type } = JSON.parse(extraData || '{}');
    if (!type || !id) {
      return res.status(400).json({ message: 'Dữ liệu extraData không hợp lệ' });
    }

    // ✅ Trường hợp thanh toán thành công
    if (result.resultCode === 0) {

      // 🎯 Phiếu khám
      if (type === 'PhiKham') {
        return PhieuKhamBenh.Select_Check_Status_Phieukhambenh_M(id, (error, result) => {
          if (error) {
            console.error('❌ Lỗi kiểm tra trạng thái:', error);
            return res.status(500).json({ message: "Lỗi khi kiểm tra phiếu khám", error });
          }

          if (!result || result.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy phiếu khám bệnh" });
          }

          const phieu = result[0];
          if (phieu.TrangThaiThanhToan === true) {
            return res.status(200).json({
              message: "Phiếu khám bệnh đã được thanh toán trước đó MoMo",
              TrangThaiDaThanhToan: true,
              data: phieu
            });
          }

          PhieuKhamBenh.GetNextSTT_M(phieu.Ngay, phieu.Id_Bacsi, (error, nextSTT) => {
            if (error) {
              console.error('❌ Lỗi lấy STT:', error);
              return res.status(500).json({ message: "Lỗi lấy STT", error });
            }

            PhieuKhamBenh.PaymentConfirmation_M(id, nextSTT, (error, result2) => {
              if (error) {
                console.error('❌ Lỗi xác nhận thanh toán:', error);
                return res.status(500).json({ message: "Lỗi xác nhận thanh toán", error });
              }

              return res.status(200).json({
                message: "✅ Xác nhận thanh toán phiếu khám thành công",
                TrangThaiDaThanhToan: true,
                STT: nextSTT,
                data: result2
              });
            });
          });
        });
      }

      // 🎯 Xét nghiệm (theo phiếu khám)
      if (type === 'XetNghiem') {
        return XetNghiem_M.Select_Check_Status_Yeucauxetnghiem_M(id, (error, result) => {
          if (error) {
            console.error('❌ Lỗi kiểm tra Xét nghiệm:', error);
            return res.status(500).json({ message: "Lỗi kiểm tra xét nghiệm", error });
          }

          if (!result || result.length === 0) {
            return res.status(404).json({ message: "Không có yêu cầu xét nghiệm cần thanh toán" });
          }

          const listId = result.map(item => item._id);
          XetNghiem_M.PaymentConfirmation_M(listId, (error, result2) => {
            if (error) {
              console.error('❌ Lỗi xác nhận thanh toán Xét nghiệm:', error);
              return res.status(500).json({ message: "Lỗi xác nhận thanh toán", error });
            }

            return res.status(200).json({
              message: "✅ Xác nhận thanh toán yêu cầu xét nghiệm thành công",
              data: result2
            });
          });
        });
      }

      // 🎯 Đơn thuốc (dùng await)
      if (type === 'Donthuoc') {
        const updatedData = await Donthuoc.findByIdAndUpdate(
          id,
          { $set: { TrangThaiThanhToan: true } },
          { new: true }
        );

        if (!updatedData) {
          return res.status(404).json({ message: 'Không tìm thấy đơn thuốc để cập nhật' });
        }

        console.log(`✅ Đã cập nhật trạng thái thanh toán cho Donthuoc ID ${id}`);
        return res.status(200).json({
          message: '✅ Đã cập nhật trạng thái thanh toán đơn thuốc thành công',
          data: updatedData,
        });
      }

      // ❌ Nếu không khớp loại nào
      return res.status(400).json({ message: 'Loại thanh toán không hợp lệ' });
    }

    // ❌ Giao dịch thất bại
    console.warn(`❌ Giao dịch thất bại. orderId: ${result.orderId}`);
    return res.status(200).json({ message: '❌ Giao dịch thất bại từ MoMo' });

  } catch (error) {
    console.error('❌ Lỗi xử lý callback:', error);
    return res.status(500).json({ message: '❌ Lỗi server khi xác nhận thanh toán' });
  }
};





// exports.handleCallback = async (req, res) => {
//   const result = req.body;
//   const id = result.extraData;

//   console.log('📩 Momo callback received:', result);
//   console.log('🧾 Id từ extraData:', id);

//   try {
 
//       console.log('✅ Thanh toán thành công. Gửi yêu cầu xác nhận...');

//       await connectDB();

//       const Check_Donthuoc = await Donthuoc.findByIdAndUpdate(
//         '685e2266f80a121de596ce55',
//         { $set: { TrangThaiThanhToan: true } },
//         { new: true }
//       );

//       if (!Check_Donthuoc) {
//         return res.status(404).json({ message: 'Không tìm thấy đơn thuốc để cập nhật' });
//       }

//       console.log(`✅ Đã cập nhật trạng thái thanh toán đơn thuốc ${id}`);
//       return res.status(200).json({
//         message: '✅ Đã cập nhật trạng thái đơn thuốc thành công',
//         data: Check_Donthuoc
//       });

//       console.warn(`❌ Giao dịch thất bại. orderId: ${result.orderId}`);
//       return res.status(200).json({ message: 'Giao dịch thất bại từ MoMo' });

//   } catch (error) {
//     console.error('❌ Lỗi xử lý callback:', error);
//     return res.status(500).json({ message: 'Lỗi server khi xác nhận thanh toán' });
//   }
// };


