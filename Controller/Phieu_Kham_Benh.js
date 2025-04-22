const Connect_Phieu_Kham_Benh = require("../Model/Phieu_Kham_Benh");
const Connect_Data_Model = new Connect_Phieu_Kham_Benh();


class Donthuoc_Controler {
  Runviews = (req, res, next) => res.send("Loadding Thành Công")

  Select_Phieukhambenh = (req, res, next) => {
    Connect_Data_Model.Select_Phieukhambenh_M ((error, result) => {
      if (error) return next(error);
      if (result.length < 1) return res.send ("Dữ liệu Phiếu Khám Bệnh Rỗng");
      res.status(200).json(result);
    });
  };


  Add_Phieukhambenh = (req , res , next) => {
    const Data_Add = {
        Id_TheKhamBenh : req.body.Id_TheKhamBenh.trim(),
        Id_CaKham : req.body.Id_CaKham.trim(),
        SoPhongKham : req.body.SoPhongKham.trim(),
        Ngay : new Date(),
        TrangThaiThanhToan : req.body.TrangThaiThanhToan.trim(),
        TenCa : req.body.TenCa.trim(),
        TenBacSi : req.body.TenBacSi.trim(),
        SoPhong : req.body.SoPhong.trim(),
        STTKham : req.body.STTKham.trim()
    }

    if (!Data_Add) return res.send ("Không có dữ liệu");
    Connect_Data_Model.Add_Phieukhambenh_M (Data_Add , (Error , Result) => {
        if (Error) return next(Error);
        res.send ("Thêm Mới Phiếu Khám Bệnh Thành Công");
    });
  }  



  Edit_Phieukhambenh = (req , res, next ) => {
    const {ID} = req.params;
    const Data_Edit = {
        SoPhongKham : req.body.SoPhongKham.trim(),
        Ngay : new Date(),
        TrangThaiThanhToan : req.body.TrangThaiThanhToan.trim(),
        TenCa : req.body.TenCa.trim(),
        TenBacSi : req.body.TenBacSi.trim(),
        SoPhong : req.body.SoPhong.trim(),
        STTKham : req.body.STTKham.trim()
    }

    if (!Data_Edit) return res.send ("Không có dữ liệu");
    Connect_Data_Model.Edit_Phieukhambenh_M (ID , Data_Edit , (Error , Result) => {
        if (Error) return next(Error);
        res.send ("Cập Nhật Phiếu Khám Bệnh Thành Công");
    });
  }
  

  Delete_Phieukham = (req , res, next) => {
    const {ID} = req.params;
    if (!ID) return res.send ("Không có dữ liệu");
    Connect_Data_Model.Delete_Phieukhambenh_M (ID , (Error , Result) => {
        if (Error) return next(Error);
        res.send ("Xóa Phiếu Khám Bệnh Thành Công");
    });
  }
  
}

module.exports = Donthuoc_Controler;
