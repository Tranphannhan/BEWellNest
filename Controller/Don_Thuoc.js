const Connect_Donthuoc = require("../Model/Don_Thuoc");
const Connect_Data_Model = new Connect_Donthuoc();

class Donthuoc_Controler {
  Runviews = (req, res, next) => res.status(200).json({ message: "Loadding Thành Công" }); // ✅ Chuẩn hóa phản hồi

  Select_Donthuoc = (req, res, next) => {
    Connect_Data_Model.Select_Donthuoc_M((error, result) => {
      if (error) return next(error);
      if (!result || result.length < 1) { 
        return res.status(404).json({ message: "Dữ liệu Đơn Thuốc rỗng" }); // ✅ Chuẩn hóa response
      }
      res.status(200).json(result);
    });
  };



  PaymentConfirmation = (req, res, next) => {
    const Id_DonThuoc = req.params.ID_DonThuoc;
  
    Connect_Data_Model.Select_Check_Status_Donthuoc_M(Id_DonThuoc, (error, result) => {
      if (error) return next(error);
  
      // Kiểm tra nếu không có dữ liệu
      if (!result || result.length === 0) {
        return res.status(404).json({ message: "Không tìm thấy đơn thuốc" });
      }

      if(result[0].TrangThaiThanhToan === true){
        return res.status(200).json({
          message: "Đơn thuốc đã được thanh toán trước đó",
          data: result
        })
      }else{
        Connect_Data_Model.PaymentConfirmation_M(Id_DonThuoc,(error, result)=>{
          if (error) return next(error);
          return res.status(200).json({
            message: "Xác nhận thanh toán đơn thuốc thành công",
            data: result
          })
        })
      }

    });
  };


  //
  Select_Status_Donthuoc = (req , res , next) => {
    const Date = req.query.date;
    Connect_Data_Model.Select_Status_Donthuoc__M (Date , (error , result) => {
      if (error) return next (error);
      if (result.length === 0) return res.status(200).json ({message : `Trạng thái đã phát hết thuốc cho bệnh nhân ngày : ${Date}`});
      res.status(200).json ({
        message : `Số lượng bênh nhận chưa được phát thuốc ngày : ${Date} là : ${result.length}`,
        data : result
      });
    });


  }


  
   

  // 

  add_Donthuoc = (req, res, next) => {
    const data = {
      Id_PhieuKhamBenh: req.body.Id_PhieuKhamBenh,
      Id_NguoiPhatThuoc: req.body.Id_NguoiPhatThuoc.trim(),
      TenDonThuoc: req.body.TenDonThuoc?.trim(),
      TrangThaiThanhToan: false,
      TrangThai:false
    };

    // ✅ Kiểm tra dữ liệu hợp lệ
    if (!data.Id_PhieuKhamBenh || !data.TenDonThuoc) {
      return res.status(400).json({ message: "Thiếu dữ liệu cần thiết" }); // ✅ Chuẩn hóa response
    }

    Connect_Data_Model.Insert_Donthuoc_M(data, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Thêm đơn thuốc thất bại", error: err });
      }
      res.status(201).json({ message: "Thêm đơn thuốc thành công", data: result }); // ✅ Chuẩn hóa response
    });
  };

  deleteDonthuoc = (req, res, next) => {
    const { id } = req.params;
  
    // ✅ Kiểm tra ID hợp lệ
    if (!id) return res.status(400).json({ message: "Thiếu ID để xóa Đơn Thuốc" }); // ✅ Kiểm tra ID hợp lệ

    Connect_Data_Model.Delete_Donthuoc_M(id, (error, deletedDonthuoc) => {
      if (error) {
        return res.status(500).json({ message: 'Lỗi khi xóa đơn thuốc', error });
      }
  
      if (!deletedDonthuoc) {
        return res.status(404).json({ message: 'Không tìm thấy đơn thuốc để xóa' }); // ✅ Chuẩn hóa response
      }
  
      return res.status(200).json({
        message: 'Xóa đơn thuốc thành công',
        deletedDonthuoc
      });
    });
  };

  updateDonthuoc = (req, res, next) => {
    const { id } = req.params;
    const data = {
      TenDonThuoc: req.body.TenDonThuoc?.trim(),
    };

    Connect_Data_Model.Update_Donthuoc_M(id, data, (error, updatedDonthuoc) => {
      if (error) {
        return res.status(500).json({ message: 'Lỗi khi cập nhật đơn thuốc', error });
      }
  
      if (!updatedDonthuoc) {
        return res.status(404).json({ message: 'Không tìm thấy đơn thuốc để cập nhật' }); // ✅ Chuẩn hóa response
      }
  
      return res.status(200).json({
        message: 'Cập nhật đơn thuốc thành công',
        updatedDonthuoc
      });
    });
  }

  Get_Not_Yet_Paid = (req, res, next) =>{
    Connect_Data_Model.Get_Not_yet_paid((err,result)=>{
      if (err) return res.status(500).json({ message: "Lỗi server", error: err });
      if (!result || result.length === 0) {
        return res.status(404).json({ message: "Không tìm thấy yêu cầu nào phù hợp" });
      }
      res.status(200).json(result);
    })
  }  


  Status_handling = (req , res , next) => {
    const ID = req.params.ID;
    Connect_Data_Model.Select_Check_Status_Donthuoc_M (ID , (err , result) => {
    if (err) return res.status(500).json({ message: "Lỗi server", error: err });
    if (result[0].TrangThai) return res.status(200).json ({message : "Trạng thái đã được xác nhận trước đó" , error: err });
    Connect_Data_Model.Upload_Status_handling__M (ID , (err , result) => {
        if (err) return res.status(500).json({ message: "Lỗi server", error: err });
        return res.status(200).json({ message: "Xác nhận trạng thái thành công" });
      });
    });
  }  
  
  SearchDS = (req,res,next) =>{
    const query = req.query;
    Connect_Data_Model.SearchDS_M(query,(err , result)=>{
      if (err) return res.status(500).json({ message: "Lỗi server", error: err });
      res.status(200).json(result)
    })
  }


}

module.exports = Donthuoc_Controler;
