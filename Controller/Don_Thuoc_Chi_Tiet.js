const Connect_Donthuoc_Chitiet  = require("../Model/Don_Thuoc_Chi_Tiet");
const Connect_Data_Model = new Connect_Donthuoc_Chitiet();

class Donthuoc_Controler {
  Runviews = (req, res, next) => {
    res.send("Loadding Thành Công");
  };
  
  Select_Donthuoc_Chitiet = (req, res, next) => {
    Connect_Data_Model.Select_Donthuoc_Chitiet_M ((error, result) => {
      if (error) return next(error);
      res.status(200).json(result);
    });
  };
  


}

module.exports = Donthuoc_Controler;
