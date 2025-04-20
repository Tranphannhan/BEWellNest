const Connect_Benhnhan_M = require("../Model/Benh_Nhan");
const Connect_Data_Model = new Connect_Benhnhan_M();

class Benhnhan_Controler {
  Runviews = (req, res, next) => {
    res.send("Loadding Thành Công");
  };

  Select_Benhnhan = (req, res, next) => {
    Connect_Data_Model.Select_Benhnhan_M((error, result) => {
      if (error) return next(error);
      res.status(200).json(result);
    });
  };


}

module.exports = Benhnhan_Controler;
