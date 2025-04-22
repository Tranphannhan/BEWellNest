

const Connect_Select_Ketquaxetnghiem = require("../Model/Ket_Qua_Xet_Nghiem");
const Connect_Data_Model = new Connect_Select_Ketquaxetnghiem();


class Ketquaxetnghiem_Controler {
  Runviews = (req, res, next) => res.send("Loadding Thành Công")

  Select_Ketquaxetnghiem = (req, res, next) => {
    Connect_Data_Model.Select_Ketquaxetnghiem_M ((error, result) => {
      if (error) return next(error);
      if (result.length < 1) return res.send ("Dữ liệu Ket qua xet nghiem Rỗng");
      res.status(200).json(result);
    });
  };


  Add_Ketquaxetnghiem = (req , res , next) => {
    const Data_Add = {
        Id_YeuCauXetNghiem : req.body.Id_YeuCauXetNghiem.trim(),
        Id_PhieuKhamBenh : req.body.Id_PhieuKhamBenh.trim(),
        TenXetNghiem : req.body.TenXetNghiem.trim(),
        KetQua : req.body.KetQua.trim(),
    }

    if (!Data_Add) return res.send ("Không có dữ liệu");
    Connect_Data_Model.Add_Ketquaxetnghiem_M (Data_Add , (Error , Result) => {
        if (Error) return next(Error);
        res.send ("Thêm Mới Kết Qủa Xét Nghiệm Thành Công");
    });
  }  


  Edit_Ketquaxetnghiem = (req , res, next ) => {
    const {ID} = req.params;
    const Data_Edit = {
        Id_YeuCauXetNghiem : req.body.Id_YeuCauXetNghiem.trim(),
        Id_PhieuKhamBenh : req.body.Id_PhieuKhamBenh.trim(),
        TenXetNghiem : req.body.TenXetNghiem.trim(),
        KetQua : req.body.KetQua.trim(),
    }

    if (!Data_Edit) return res.send ("Không có dữ liệu");
    Connect_Data_Model.Edit_Ketquaxetnghiem_M  (ID , Data_Edit , (Error , Result) => {
        if (Error) return next(Error);
        res.send ("Cập Nhật Kết Qủa Yêu Cầu Xét Nghiệm Thành Công");
    });
  }
  

  Delete_Ketquaxetnghiem = (req , res, next) => {
    const {ID} = req.params;
    if (!ID) return res.send ("Không có dữ liệu");
    Connect_Data_Model.Delete_Ketquaxetnghiem_M (ID , (Error , Result) => {
        if (Error) return next(Error);
        res.send ("Xóa Kết Qủa Yêu Cầu Xét Nghiệm Thành Công");
    });
  }
  
}

module.exports = Ketquaxetnghiem_Controler;
