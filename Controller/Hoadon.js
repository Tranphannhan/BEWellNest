const Connect_Hoadon_M = require("../Model/Hoadon");
const Connect_Data_Model = new Connect_Hoadon_M();

class Hoadon_Controler {
    Runviews = (req, res, next) => {
        res.status(200).json({ message: "Loading Thành Công" }); 
    };


    Select_Hoadon = (req, res, next) => {
        Connect_Data_Model.Select_Hoadon__M((error, result) => {
        if (error) return next(error);
        if (result.length === 0) return res.status(404).json({ message: "Không có hóa đơn nào hệ thống" }); 
        res.status(200).json(result);
        });
    };


    Add_Hoadon = (req, res, next) => {
        const data = {
        Id_PhieuKhamBenh: req.body.Id_PhieuKhamBenh?.trim(),
        Id_Dichvu : req.body.Id_Dichvu?.trim(),
        TenHoaDon: req.body.TenHoaDon?.trim(),
        TongTien: req.body.TongTien
        };

        Connect_Data_Model.Add_Hoadon__M (data, (error, result) => {
            if (error) return res.status(500).json({ message: "Thêm Hóa Đơn Thất Bại"});
            res.status(201).json({ message: "Thêm Hóa Đơn Thành Công"}); 
        });
    };



    Upload_Hoadon = (req, res, next) => {
        const { ID } = req.params;
        const data = {
            Id_PhieuKhamBenh: req.body.Id_PhieuKhamBenh?.trim(),
            Id_Dichvu : req.body.Id_Dichvu?.trim(),
            TenHoaDon: req.body.TenHoaDon?.trim(),
            TongTien: req.body.TongTien
        };

        Connect_Data_Model.Update_Hoadon__M (ID , data, (error, result) => {
            if (error) return res.status(500).json({ message: "Cập Nhật Hóa Đơn Thất Bại"});
            res.status(201).json({ message: "Cập Nhật Hóa Đơn Thành Công"}); 
        });
    };

    
    Delete_Hoadon = (req, res, next) => {
        const { ID } = req.params;
        Connect_Data_Model.Delete_Hoadon_M( ID, (error, result) => {
            if (error) return res.status(500).json({ message: 'Lỗi khi xóa hóa đơn', error });
            return res.status(200).json({ message: 'Xóa hóa đớn thành công'});
        });
    };


}

module.exports = Hoadon_Controler;
