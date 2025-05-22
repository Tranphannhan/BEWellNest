const Connect_Khoa = require("../Model/Loaica");
const Connect_Data_Model = new Connect_Khoa();

class Khoa_Controler {
    Runviews = (req, res, next) => res.status(200).json({ message: "Loadding Thành Công" }); 

    Select_Loaica = (req, res, next) => {
        Connect_Data_Model.Select_LoaiCa__M ((error, result) => {
        if (error) return next(error);
        res.status(200).json(result);
        });
    };
         

    Add_Loaica = (req, res, next) => {
        const Data = {
        TenLoaiCa : req.body.TenLoaiCa?.trim(),
        ThoiGianKetThuc : req.body.ThoiGianKetThuc?.trim(),
        ThoiGianBatDau : req.body.ThoiGianBatDau?.trim(),
        };

        Connect_Data_Model.Insert_Loaica_M (Data, (err, result) => {
        if (err)return next (err);
        res.status(201).json({ message: "Thêm Loại Ca thành công", data: result }); 
        });
    };



    Update_Loaica = (req, res) => {
        const { ID } = req.params;
        const Data_Edit = {
            TenLoaiCa : req.body.TenLoaiCa?.trim(),
            ThoiGianKetThuc : req.body.ThoiGianKetThuc?.trim(),
            ThoiGianBatDau : req.body.ThoiGianBatDau?.trim(),
        };

        Connect_Data_Model.Update_Loaica_M (ID, Data_Edit, (error, result) => {
            if (error) return res.status(500).json({ message: 'Lỗi khi cập nhật khoa', error }); 
            if (!result) return res.status(404).json({ message: 'Không tìm Thấy Loại Ca để cập nhật' });

            return res.status(200).json({
                message: 'Cập nhật Loại Ca thành công',
                data: result, 
            });
        });
    };


    Delete_Loaica = (req, res) => {
        const { ID } = req.params;
        if (!ID) return res.status(400).json({ message: "Thiếu ID để xóa Loại Ca" }); 

        Connect_Data_Model.Delete_Loaica_M (ID, (error, result) => {
            if (error) return res.status(500).json({ message: 'Lỗi khi xóa khoa', error }); 
            if (!result) return res.status(404).json({ message: 'Không tìm thấy khoa để xóa' }); 
            return res.status(200).json({
                message: 'Xóa Loại Ca thành công',
                data: result, 
            });
        });
    };
}

module.exports = Khoa_Controler;
