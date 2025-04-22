const Connect_Select_Yeu_Cau_Xet_Nghiem = require("../Model/Yeu_Cau_Xet_Nghiem");
const Connect_Data_Model = new Connect_Select_Yeu_Cau_Xet_Nghiem();

  
class  Yeucauxetnghiem_Controler {
  Runviews = (req, res, next) => res.send("Loadding Thành Công")

  Select_Yeucauxetnghiem = (req, res, next) => {
    Connect_Data_Model.Select_Yeucauxetnghiem_M ((error, result) => {
      if (error) return next(error);
      if (result.length < 1) return res.send ("Dữ liệu Yeucauxetnghiem Rỗng");
      res.status(200).json(result);
    });
  };


  Add_Yeucauxetnghiem = (req , res , next) => {
    const Data_Add = {
        Id_PhieuKhamBenh : req.body.Id_PhieuKhamBenh.trim(),
        Id_PhongThietBi : req.body.Id_PhongThietBi.trim(),
        TenXetNghiem : req.body.TenXetNghiem.trim(),
        TrangThaiThanhToan : req.body.TrangThaiThanhToan.trim(),
        STT : req.body.STT.trim()
    }

    if (!Data_Add) return res.send ("Không có dữ liệu");
    Connect_Data_Model.Add_Yeucauxetnghiem_M (Data_Add , (Error , Result) => {
        if (Error) return next(Error);
        res.send ("Thêm Mới Yêu Cầu Khám Bệnh Thành Công");
    });
  }  


  Edit_Yeucauxetnghiem = (req , res, next ) => {
    const {ID} = req.params;
    const Data_Edit = {
        Id_PhieuKhamBenh : req.body.Id_PhieuKhamBenh.trim(),
        Id_PhongThietBi : req.body.Id_PhongThietBi.trim(),
        TenXetNghiem : req.body.TenXetNghiem.trim(),
        TrangThaiThanhToan : req.body.TrangThaiThanhToan.trim(),
        STT : req.body.STT.trim()
    }

    if (!Data_Edit) return res.send ("Không có dữ liệu");
    Connect_Data_Model.Edit_Yeucauxetnghiem_M (ID , Data_Edit , (Error , Result) => {
        if (Error) return next(Error);
        res.send ("Cập Nhật Yêu Cầu Khám Bệnh Thành Công");
    });
  }
  

  Delete_Yeucauxetnghiem = (req , res, next) => {
    const {ID} = req.params;
    if (!ID) return res.send ("Không có dữ liệu");
    Connect_Data_Model.Delete_Yeucauxetnghiem_M (ID , (Error , Result) => {
        if (Error) return next(Error);
        res.send ("Xóa Thẻ Yêu Cầu Khám Bệnh Thành Công");
    });
  }
  
}

module.exports = Yeucauxetnghiem_Controler;
