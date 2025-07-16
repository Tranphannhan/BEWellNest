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

}

module.exports = Thuoc_Controler;
