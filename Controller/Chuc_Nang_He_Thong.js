const Connect_Select_Phieukhambenh = require("../Model/Chuc_Nang_He_Thong");
const Connect_Data_Model = new Connect_Select_Phieukhambenh();

class Thuoc_Controler {
  GetChucNang = (req, res, next) => {
    Connect_Data_Model.GetChucNang__M ((error, result) => {
      if (error) return next(error);
      if (result.length < 1) return res.status(404).json({ message: "Dữ liệu Rỗng" });
      res.status(200).json(result);
    });
  };

  UpdateChucNang = (req, res, next) => {
    const id = req.params.id;
    const dataUpdate = req.body;

    Connect_Data_Model.UpdateChucNang__M(id, dataUpdate, (error, result) => {
      if (error) return next(error);
      if (!result) return res.status(404).json({ message: "Không tìm thấy dữ liệu cần cập nhật" });
      res.status(200).json({ message: "Cập nhật thành công", data: result });
    });
  };
  
}

module.exports = Thuoc_Controler;
