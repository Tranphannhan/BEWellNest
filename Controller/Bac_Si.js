const Connect_Bacsi_M = require("../Model/Bac_Si");
const Connect_Data_Model = new Connect_Bacsi_M();

class Bacsi_Controler {
  Runviews = (req, res, next) => {
    res.send("Loadding Thành Công");
  };

  Select_Bacsi = (req, res, next) => {
    Connect_Data_Model.Select_Bacsi_M((error, result) => {
      if (error) return next(error);
      res.status(200).json(result);
    });
  };


}

module.exports = Bacsi_Controler;
