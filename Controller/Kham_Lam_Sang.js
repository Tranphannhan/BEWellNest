const Connect_Kham_Lam_Sang = require("../Model/Kham_Lam_Sang");
const Connect_Data_Model = new Connect_Kham_Lam_Sang();

  
class Kham_Lam_Sang {
  Runviews = (req, res, next) => res.send("Loadding Thành Công")

  Select_Kham_Lam_Sang = (req, res, next) => {
    Connect_Data_Model.Select_Phieukhambenh_M ((error, result) => {
      if (error) return next(error);
      if (result.length < 1) return res.send ("Dữ liệu Kham_Lam_Sang Rỗng");
      res.status(200).json(result);
    });
  };


  Add_Kham_Lam_Sang = (req , res , next) => {
    const Data_Add = {
        Id_PhieuKhamBenh : req.body.Id_PhieuKhamBenh.trim(),
        TrieuChung : req.body.TrieuChung.trim(),
        KetQua: req.body.KetQua.trim()
    }

    if (!Data_Add) return res.send ("Không có dữ liệu");
    Connect_Data_Model.Add_Kham_Lam_Sang_M (Data_Add , (Error , Result) => {
        if (Error) return next(Error);
        res.send ("Thêm Mới Kham_Lam_Sang Thành Công");
    });
  }  



  Edit_Kham_Lam_Sang = (req , res, next ) => {
    const {ID} = req.params;
    const Data_Edit = {
        Id_PhieuKhamBenh : req.body.Id_PhieuKhamBenh.trim(),
        TrieuChung : req.body.TrieuChung.trim(),
        KetQua: req.body.KetQua.trim()
    }

    if (!Data_Edit) return res.send ("Không có dữ liệu");
    Connect_Data_Model.Edit_Kham_Lam_Sang_M (ID , Data_Edit , (Error , Result) => {
        if (Error) return next(Error);
        res.send ("Cập Nhật Kham_Lam_Sang Thành Công");
    });
  }
  

  Delete_Kham_Lam_Sang = (req , res, next) => {
    const {ID} = req.params;
    if (!ID) return res.send ("Không có dữ liệu");
    Connect_Data_Model.Delete_Kham_Lam_Sang_M (ID , (Error , Result) => {
        if (Error) return next(Error);
        res.send ("Xóa Kham_Lam_Sang Thành Công");
    });
  }
  
}

module.exports = Kham_Lam_Sang;
