const Connect_Giadichvu__M = require("../Model/Gia_Dich_Vu");
const Connect_Data_Model = new Connect_Giadichvu__M();

class Giadichvu_Controler {
    Runviews = (req, res, next) => {
        res.status(200).json({ message: "Loading Thành Công" }); 
    };


    Select_Giadichvu = (req, res, next) => {
        Connect_Data_Model.Select_Giadichvu__M((error, result) => {
        if (error) return next(error);
        if (result.length === 0) return res.status(404).json({ message: "Không có giá dịch vụ trên hệ thống" }); 
        res.status(200).json(result);
        });
    };


    Add_Giadichvu = (req, res, next) => {
        const data = {
            Tendichvu: req.body.Tendichvu?.trim(),
            Giadichvu: req.body.Giadichvu
        };

        Connect_Data_Model.Add_Giadichvu__M (data, (error, result) => {
            if (error) return res.status(500).json({ message: "Thêm giá dịch vụ thất bại"});
            res.status(201).json({ message: "Thêm giá dịch vụ thành công"}); 
        });
    };



    Upload_Giadichvu = (req, res, next) => {
        const { ID } = req.params;
        const data = {
            Tendichvu: req.body.Tendichvu?.trim(),
            Giadichvu: req.body.Giadichvu
        };

        Connect_Data_Model. Upload_Giadichvu__M (ID , data, (error, result) => {
            if (error) return res.status(500).json({ message: "Cập nhật giá dịch vụ thất bại"});
            res.status(201).json({ message: "cập nhật giá dịch vụ thành công"}); 
        });
    };

    
    Delete_Giadichvu = (req, res, next) => {
        const { ID } = req.params;
        Connect_Data_Model.Delete_Giadichvu__M( ID, (error, result) => {
            if (error) return res.status(500).json({ message: 'Lỗi khi xóa giá dịch vụ', error });
            return res.status(200).json({ message: 'Xóa giá dịch vụ thành công'});
        });
    };


}

module.exports = Giadichvu_Controler;
