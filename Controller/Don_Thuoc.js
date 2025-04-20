const Connect_Donthuoc = require("../Model/Don_Thuoc");
const Connect_Data_Model = new Connect_Donthuoc();

class Donthuoc_Controler {
  Runviews = (req, res, next) => {
    res.send("Loadding Thành Công");
  };

  Select_Donthuoc = (req, res, next) => {
    Connect_Data_Model.Select_Donthuoc_M ((error, result) => {
      if (error) return next(error);
      res.status(200).json(result);
    });
  };
  


}

module.exports = Donthuoc_Controler;
