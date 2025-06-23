
const Connect_Cakham = require("../Model/Chi_Tiet_Kham_Lam_Sang");
const Connect_Data_Model = new Connect_Cakham();


class Chitiet_Khamkhamlamsang_Controler {


    Select_Chitietkhambenh = (req, res, next) => {
        Connect_Data_Model.Select_Chitietkhambenh__M ((error, result) => {
        if (error) return next(error);
        if (!result || result.length < 1) {
            return res.status(404).json({ message: "Dữ liệu khám lâm sàng chi tiết rỗng" }); 
        }
            res.status(200).json(result);
        });
    };

    LayTheoPhieuKhamBenh = (req, res, next) => {
        const Id_PhieuKhamBenh = req.query.Id_PhieuKhamBenh;
        if(!Id_PhieuKhamBenh)return res.status(404).json({ message: "Không có Id_PhieuKhamBenh" }); 
        Connect_Data_Model.LayTheoPhieuKhamBenh_M (Id_PhieuKhamBenh,(error, result) => {
        if (error) return next(error);
        if (!result || result.length < 1) {
            return res.status(404).json({ message: "Dữ liệu khám lâm sàng chi tiết rỗng" }); 
        }
            res.status(200).json(result);
        });
    };

    KiemTraCoChiTietKhamLamSang = (req, res, next) => {
        const id = req.query.Id_PhieuKhamBenh;
        if(!id) return res.status(404).json({ message: "Vui lòng truyền Id_PhieuKhamBenh" }); 

        Connect_Data_Model.KiemTraCoChiTietKhamLamSang_M (id, (error, result) => {
        if (error) return next(error);
        if (!result || result.length < 1) {
            return res.status(404).json({ message: "Dữ liệu khám lâm sàng chi tiết rỗng" }); 
        }
            res.status(200).json(result);
        });
    };


    add_Chitietkhambenh = (req, res, next) => {
        const Data = {
            Id_KhamLamSang: req.body.Id_KhamLamSang?.trim(),
            TrieuChung: req.body.TrieuChung?.trim(),
            ChuanDoanSoBo: req.body.ChuanDoanSoBo?.trim(),
        };

        Connect_Data_Model.add_Chitietkhambenh_M (Data, (err, result) => {
            if (err) return res.status(500).json({ message: "Thêm khám lâm sàng chi tiết thất bại", error: err });
            res.status(201).json({ message: "Thêm khám lâm sàng chi tiết thành công", data: result }); 
        });
    };

    


  Update_Chitietkhambenh = (req, res, next) => {
    const { ID , ID_Khamlamsang } = req.params;
    if (!ID || !ID_Khamlamsang ) return res.status(500).json({ message: "Thiếu ID để sửa ca khám" }); 
    const Data = {
      TrieuChung: req.body.TrieuChung?.trim(),
      ChuanDoanSoBo: req.body.ChuanDoanSoBo?.trim()
    }

    Connect_Data_Model.Upload_Chitietkhambenh__M (ID , ID_Khamlamsang  , Data , (error, Result) => {
      if (error) return next (error);
      if (!Result) return res.status(404).json({ message: 'Không tìm thấy '}); 
      return res.status(404).json({ message: Result}); 
    });
  };

  

  Delete_Chitietkhambenh = (req , res , next) => {
    const { ID , ID_Khamlamsang } = req.params;
    if (!ID || !ID_Khamlamsang ) return res.status(500).json({ message: "Thiếu ID để xóa ca khám" }); 

    Connect_Data_Model.Delete_Chitietkhambenh__M (ID , ID_Khamlamsang  , (error, Result) => {
      if (error) return next (error);
      return res.status(404).json({ message: Result}); 
    });

  }

}

module.exports = Chitiet_Khamkhamlamsang_Controler;
