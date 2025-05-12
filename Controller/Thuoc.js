const Connect_Select_Phieukhambenh = require("../Model/Thuoc");
const Connect_Data_Model = new Connect_Select_Phieukhambenh();

class Thuoc_Controler {
  Runviews = (req, res, next) => {
    res.status(200).json({ message: "Loadding Thành Công" });
  };  

  Select_Donthuoc = (req, res, next) => {
    Connect_Data_Model.Select_Thuoc__M ((error, result) => {
      if (error) return next(error);
      if (result.length < 1) return res.status(404).json({ message: "Dữ liệu Thẻ Khám Bệnh Rỗng" });
      res.status(200).json(result);
    });
  };


  Add_Donthuoc = (req, res, next) => {
    const Data_Add = {
      TenThuoc: req.body.TenThuoc.trim(),
      MoTa : req.body.MoTa.trim(),
      ThanhPhan: req.body.ThanhPhan.trim(),
      DangBaoChe: req.body.DangBaoChe.trim(),
      CachDung : req.body.CachDung.trim(),
      ChiDinhSuDung: req.body.ChiDinhSuDung.trim(),
      ChongChiDinh: req.body.ChongChiDinh.trim(),
      TacDungPhu: req.body.TacDungPhu.trim(),
      NhaSanXuat: req.body.NhaSanXuat.trim(),
      NhomThuoc: req.body.NhomThuoc.trim(),
      NgaySanXuat: req.body.NgaySanXuat.trim(),
      HanSuDung: req.body.HanSuDung.trim(),
      NgayNhapKho: req.body.NgayNhapKho.trim(),
      DonVi: req.body.DonVi.trim(),
      GiaMoiDonVi: req.body.GiaMoiDonVi,
      LoThuoc: req.body.LoThuoc.trim(),
      SoLuong: req.body.SoLuong
    };

    if (!Data_Add) return res.status(400).json({ message: "Không có dữ liệu" });
    Connect_Data_Model.Add_Thuoc__M(Data_Add, (Error, Result) => {
      if (Error) return next(Error);
      res.status(201).json({ message: "Thêm Mới Đơn Thuốc Thành Công" });
    });
  };


  Edit_Donthuoc = (req, res, next) => {
    const { ID } = req.params;
    const Data_Edit = {
      TenThuoc: req.body.TenThuoc.trim(),
      MoTa : req.body.MoTa.trim(),
      ThanhPhan: req.body.ThanhPhan.trim(),
      DangBaoChe: req.body.DangBaoChe.trim(),
      CachDung : req.body.CachDung.trim(),
      ChiDinhSuDung: req.body.ChiDinhSuDung.trim(),
      ChongChiDinh: req.body.ChongChiDinh.trim(),
      TacDungPhu: req.body.TacDungPhu.trim(),
      NhaSanXuat: req.body.NhaSanXuat.trim(),
      NhomThuoc: req.body.NhomThuoc.trim(),
      NgaySanXuat: req.body.NgaySanXuat.trim(),
      HanSuDung: req.body.HanSuDung.trim(),
      NgayNhapKho: req.body.NgayNhapKho.trim(),
      DonVi: req.body.DonVi.trim(),
      GiaMoiDonVi: req.body.GiaMoiDonVi,
      LoThuoc: req.body.LoThuoc.trim(),
      SoLuong: req.body.SoLuong
    };

    if (!Data_Edit) return res.status(400).json({ message: "Không có dữ liệu" });
    Connect_Data_Model.Edit_Dongthuoc__M (ID, Data_Edit, (Error, Result) => {
      if (Error) return next(Error);
      res.status(200).json({ message: "Cập Nhật Đơn Thuốc Thành Công" });
    });
  };


  Delete_Donthuoc = (req, res, next) => {
    const { ID } = req.params;
    if (!ID) return res.status(400).json({ message: "Không có dữ liệu" });
    Connect_Data_Model.Delete_Donthuoc__M(ID, (Error, Result) => {
      if (Error) return next(Error);
      res.status(200).json({ message: "Xóa Đơn Thuốc Thành Công" });
    });
  };


}

module.exports = Thuoc_Controler;
