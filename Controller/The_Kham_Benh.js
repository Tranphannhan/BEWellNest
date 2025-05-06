const Connect_Select_Phieukhambenh = require("../Model/The_Kham_Benh");
const Connect_Data_Model = new Connect_Select_Phieukhambenh();

  
class The_Kham_Benh_Controler {
  Runviews = (req, res, next) => res.send("Loadding Thành Công")

  Select_Thekhambenh = (req, res, next) => {
    Connect_Data_Model.Select_The_khambenh_M ((error, result) => {
      if (error) return next(error);
      if (result.length < 1) return res.send ("Dữ liệu Thẻ Khám Bệnh Rỗng");
      res.status(200).json(result);
    });
  };


  Add_Thekhambenh = (req , res , next) => {
    const Data_Add = {
        HoVaTen : req.body.HoVaTen.trim(),
        GioiTinh : req.body.GioiTinh.trim(),
        NgaySinh : req.body.NgaySinh.trim(),
        SoDienThoai : req.body.SoDienThoai.trim(),
        SoBaoHiemYTe : req.body.SoBaoHiemYTe.trim(),
        DiaChi : req.body.DiaChi.trim(),
        SDT_NguoiThan : req.body.SDT_NguoiThan.trim()
    }

    if (!Data_Add) return res.send ("Không có dữ liệu");
    Connect_Data_Model.Add_Thekhambenh_M (Data_Add , (Error , Result) => {
        if (Error) return next(Error);
        res.send ("Thêm Mới Thẻ Khám Bệnh Thành Công");
    });
  }  



  Edit_Thekhambenh = (req , res, next ) => {
    const {ID} = req.params;
    const Data_Edit = {
        HoVaTen : req.body.HoVaTen.trim(),
        GioiTinh : req.body.GioiTinh.trim(),
        NgaySinh : req.body.NgaySinh.trim(),
        SoDienThoai : req.body.SoDienThoai.trim(),
        SoBaoHiemYTe : req.body.SoBaoHiemYTe.trim(),
        DiaChi : req.body.DiaChi.trim()
    }

    if (!Data_Edit) return res.send ("Không có dữ liệu");
    Connect_Data_Model.Edit_Thekhambenh_M (ID , Data_Edit , (Error , Result) => {
        if (Error) return next(Error);
        res.send ("Cập Nhật Thẻ Khám Bệnh Thành Công");
    });
  }
  

  Delete_Phieukham = (req , res, next) => {
    const {ID} = req.params;
    if (!ID) return res.send ("Không có dữ liệu");
    Connect_Data_Model.Delete_Thekhambenh_M (ID , (Error , Result) => {
        if (Error) return next(Error);
        res.send ("Xóa Thẻ Khám Bệnh Thành Công");
    });
  }
  
}

module.exports = The_Kham_Benh_Controler;
