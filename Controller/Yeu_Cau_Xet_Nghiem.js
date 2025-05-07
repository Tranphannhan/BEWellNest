const { Query } = require("mongoose");
const Connect_Select_Yeu_Cau_Xet_Nghiem = require("../Model/Yeu_Cau_Xet_Nghiem");
const Connect_Data_Model = new Connect_Select_Yeu_Cau_Xet_Nghiem();

class Yeucauxetnghiem_Controler {
  Runviews = (req, res, next) => {
    res.status(200).json({ message: "Loadding Thành Công" });
  };

  Select_Yeucauxetnghiem = (req, res, next) => {
    Connect_Data_Model.Select_Yeucauxetnghiem_M((error, result) => {
      if (error) return next(error);
      if (result.length < 1) return res.status(404).json({ message: "Dữ liệu Yeucauxetnghiem Rỗng" });
      res.status(200).json(result);
    });
  };

  Add_Yeucauxetnghiem = (req, res, next) => {
    const ngay = new Date().toISOString().split("T")[0];

    Connect_Data_Model.GetNextSTT_M(ngay, req.body.Id_PhongThietBi.trim(), (error, nextSTT) => {
      if (error) return next(error);

      const Data_Add = {
        Id_PhieuKhamBenh: req.body.Id_PhieuKhamBenh.trim(),
        Id_PhongThietBi: req.body.Id_PhongThietBi.trim(),
        TenXetNghiem: req.body.TenXetNghiem.trim(),
        TrangThaiThanhToan: false,
        Ngay: ngay,
        // Số thức tự mới tạo là 0 vì thanh toán xong thì mới xếp số thứ tự
        STT: 0
      };

      if (!Data_Add) return res.status(400).json({ message: "Không có dữ liệu" });

      Connect_Data_Model.Add_Yeucauxetnghiem_M(Data_Add, (Error, Result) => {
        if (Error) return next(Error);
        res.status(201).json({ message: "Thêm Mới Yêu Cầu Khám Bệnh Thành Công" });
      });
    });
  };

  Edit_Yeucauxetnghiem = (req, res, next) => {
    const { ID } = req.params;
    const Data_Edit = {
      Id_PhieuKhamBenh: req.body.Id_PhieuKhamBenh.trim(),
      Id_PhongThietBi: req.body.Id_PhongThietBi.trim(),
      TenXetNghiem: req.body.TenXetNghiem.trim(),
      TrangThaiThanhToan: req.body.TrangThaiThanhToan.trim(),
      STT: req.body.STT.trim(),
    };

    if (!Data_Edit) return res.status(400).json({ message: "Không có dữ liệu" });

    Connect_Data_Model.Edit_Yeucauxetnghiem_M(ID, Data_Edit, (Error, Result) => {
      if (Error) return next(Error);
      res.status(200).json({ message: "Cập Nhật Yêu Cầu Khám Bệnh Thành Công" });
    });
  };

  Delete_Yeucauxetnghiem = (req, res, next) => {
    const { ID } = req.params;
    if (!ID) return res.status(400).json({ message: "Không có dữ liệu" });

    Connect_Data_Model.Delete_Yeucauxetnghiem_M(ID, (Error, Result) => {
      if (Error) return next(Error);
      res.status(200).json({ message: "Xóa Thẻ Yêu Cầu Khám Bệnh Thành Công" });
    });
  };

  Get_ById_PTB_Date = (req, res, next) => {
    const { Id_PhongThietBi, ngay } = req.query;

    if (!Id_PhongThietBi || !ngay) {
      return res.status(400).json({ message: "Không có ngày hoặc Id_PhongThietBi" });
    }

    Connect_Data_Model.Get_By_PTB_Date_M(Id_PhongThietBi, ngay, (err, result) => {
      if (err) return res.status(500).json({ message: "Lỗi server", error: err });

      if (!result || result.length === 0) {
        return res.status(404).json({ message: "Không tìm thấy yêu cầu nào phù hợp" });
      }

      res.status(200).json(result);
    });
  };
}

module.exports = Yeucauxetnghiem_Controler;
