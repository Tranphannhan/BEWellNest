const Connect_Cakham = require("../Model/Ca_kham");
const Connect_Data_Model = new Connect_Cakham();

class Cakham_Controler {
  Runviews = (req, res, next) => {
    res.send("Loadding Thành Công");
  };

  Select_Cakham = (req, res, next) => {
    Connect_Data_Model.Select_Cakham_M ((error, result) => {
      if (error) return next(error);
      res.status(200).json(result);
    });
  };


}

module.exports = Cakham_Controler;
