const Connect_Select_Phieukhambenh = require("../Model/Thuoc");
const Connect_Data_Model = new Connect_Select_Phieukhambenh();

class Thuoc_Controler {
  Runviews = (req, res, next) => {
    res.status(200).json({ message: "Loadding Thành Công" });
  };  

  Select_Donthuoc = (req, res, next) => {
    Connect_Data_Model.Select_Thuoc__M ((error, result) => {
      if (error) return next(error);
      if (result.length < 1) return res.status(404).json({ message: "Dữ liệu Rỗng" });
      res.status(200).json(result);
    });
  };
  

  Get_Pagination = (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 7;
    Connect_Data_Model.Get_Pagination_M (page,limit,(error, result) => {
      if (error) return next(error);
      if (result.length < 1) return res.status(404).json({ message: "Dữ liệu Rỗng" });
      res.status(200).json(result);
    });
  };
   

  TimKiemTenThuoc =  (req, res, next) => {
    const Key_Select = req.query.search;
    Connect_Data_Model.TimKiemTenThuoc__M  (Key_Select ,(error, result) => {
      if (error) return next(error);
      if (result.length < 1) return res.status(404).json({ message: "Không tìm thấy thuốc trong kho" });
      res.status(200).json(result);
    });
  };



  Add_Donthuoc = (req, res, next) => {
    const Data_Add = {
      Id_NhomThuoc: req.body.Id_NhomThuoc.trim(),
      Id_NhaSanXuat: req.body.Id_NhaSanXuat.trim(),
      TenThuoc: req.body.TenThuoc.trim(),
      MoTa : req.body.MoTa.trim(),
      ThanhPhan: req.body.ThanhPhan.trim(),
      CachDung : req.body.CachDung.trim(),
      NgaySanXuat: req.body.NgaySanXuat.trim(),
      HanSuDung: req.body.HanSuDung.trim(),
      NgayNhapKho: req.body.NgayNhapKho.trim(),
      DonVi: req.body.DonVi.trim(),
      GiaMoiDonVi: req.body.GiaMoiDonVi,
      LoThuoc: req.body.LoThuoc.trim(),
      SoLuong: req.body.SoLuong.trim(),
      URLAnhThuoc: req.body.URLAnhThuoc.trim(),
    };

    if (!Data_Add) return res.status(400).json({ message: "Không có dữ liệu" });
    Connect_Data_Model.Add_Thuoc__M(Data_Add, (Error, Result) => {
      if (Error) return next(Error);
      res.status(201).json({ message: "Thêm Mới Thuốc Thành Công" });
    });
  };


  Edit_Donthuoc = (req, res, next) => {
    const { ID } = req.params;
    const Data_Edit = {
      Id_NhomThuoc: req.body.Id_NhomThuoc.trim(),
      Id_NhaSanXuat: req.body.Id_NhaSanXuat.trim(),
      TenThuoc: req.body.TenThuoc.trim(),
      MoTa : req.body.MoTa.trim(),
      ThanhPhan: req.body.ThanhPhan.trim(),
      CachDung : req.body.CachDung.trim(),
      NgaySanXuat: req.body.NgaySanXuat.trim(),
      HanSuDung: req.body.HanSuDung.trim(),
      NgayNhapKho: req.body.NgayNhapKho.trim(),
      DonVi: req.body.DonVi.trim(),
      GiaMoiDonVi: req.body.GiaMoiDonVi,
      LoThuoc: req.body.LoThuoc.trim(),
      SoLuong: req.body.SoLuong.trim(),
      URLAnhThuoc: req.body.URLAnhThuoc.trim(),
    };

    if (!Data_Edit) return res.status(400).json({ message: "Không có dữ liệu" });
    Connect_Data_Model.Edit_Dongthuoc__M (ID, Data_Edit, (Error, Result) => {
      if (Error) return next(Error);
      res.status(200).json({ message: "Cập Nhật Thuốc Thành Công" });
    });
  };


  Delete_Donthuoc = (req, res, next) => {
    const { ID } = req.params;
    if (!ID) return res.status(400).json({ message: "Không có dữ liệu" });
    Connect_Data_Model.Delete_Donthuoc__M(ID, (Error, Result) => {
      if (Error) return next(Error);
      res.status(200).json({ message: "Xóa Thuốc Thành Công" });
    });
  };

  Get_Detail = (req, res, next) => {
    const Id = req.params.ID
    Connect_Data_Model.Get_Detail_M (Id ,(error, result) => {
      if (error) return next(error);
      if (result.length < 1) return res.status(404).json({ message: "Dữ liệu Rỗng" });
      res.status(200).json(result);
    });
  };

  Get_TakeInGroups = (req, res, next) => {
    const Id = req.params.Id_NhomThuoc
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 7;
    Connect_Data_Model.Get_TakeInGroups_M (page, limit ,Id ,(error, result) => {
      if (error) return next(error);
      if (result.length < 1) return res.status(404).json({ message: "Dữ liệu Rỗng" });
      res.status(200).json(result);
    });
  };
}

module.exports = Thuoc_Controler;
