const Connect_Giadichvu__M = require("../Model/Loai_Xet_Nghiem");
const Connect_Data_Model = new Connect_Giadichvu__M();

class Loaixetnghiem_Controler {
    Runviews = (req, res, next) => {
        res.status(200).json({ message: "Loading Thành Công" }); 
    };

    Select_LoaiXetNghiem = (req, res, next) => {
        Connect_Data_Model.Select_Loai_Xet_Nghiem__M((error, result) => {
        if (error) return next(error);
        if (result.length === 0) return res.status(404).json({ message: "Không có Loai_Xet_Nghiem hệ thống" }); 
        res.status(200).json(result);
        });
    };
  

    ThayDoiTrangThaiHoatDong = (req , res , next) => {
        const Trangthai = req.query.TrangThaiHoatDong;
        const ID = req.params.ID;

        Connect_Data_Model.ThayDoiTrangThaiHoatDong_M (Trangthai , ID ,(error, result) => {
            if (error) return next(error);
            if (result.length === 0) return res.status(404).json({ message: "Cập nhật trạng thái thất bại" }); 
            res.status(200).json({message : "Cập nhật trạng thái thành công" , Data : result});
        });  
    }

      
    Add_LoaiXetNghiem = (req, res, next) => {
        const GET_Image =  req.file ? req.file.filename : 'http://localhost:5000/image/AnhMacDinhKetQuaXetNghiem.png';
        const Data_Add = {
            Id_PhongThietBi: req.body.Id_PhongThietBi?.trim(),
            Id_GiaDichVu : req.body.Id_GiaDichVu?.trim(),
            MoTaXetNghiem : req.body.MoTaXetNghiem?.trim(),
            TenXetNghiem : req.body.TenXetNghiem?.trim(),
            Image : GET_Image,
            TrangThaiHoatDong : true
        };

        Connect_Data_Model.Add_Loai_Xet_Nghiem__M (Data_Add, (error, result) => {
            if (error) return res.status(500).json({ message: "Thêm Loai_Xet_Nghiem thất bại"});
            res.status(201).json({ message: "Thêm Loai_Xet_Nghiem thành công"}); 
        });
    };
    


    Upload_LoaiXetNghiem = (req, res, next) => {
        const { ID } = req.params;
        const data = {
            Tendichvu: req.body.Tendichvu?.trim(),
            Loaigia : req.body.Loaigia,
            Giadichvu: req.body.Giadichvu
        };

        Connect_Data_Model. Upload_Loai_Xet_Nghiem__M (ID , data, (error, result) => {
            if (error) return res.status(500).json({ message: "Cập nhật Loai_Xet_Nghiem thất bại"});
            res.status(201).json({ message: "cập nhật Loai_Xet_Nghiem thành công"}); 
        });
    };

    
    Delete_LoaiXetNghiem = (req, res, next) => {
        const { ID } = req.params;
        Connect_Data_Model.Delete_Loai_Xet_Nghiem__M( ID, (error, result) => {
            if (error) return res.status(500).json({ message: 'Lỗi khi xóa Loai_Xet_Nghiem', error });
            return res.status(200).json({ message: 'Xóa Loai_Xet_Nghiem thành công'});
        });
    };


}

module.exports = Loaixetnghiem_Controler;
