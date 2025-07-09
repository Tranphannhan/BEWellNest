const Connect_Giadichvu__M = require("../Model/Loai_Xet_Nghiem");
const Connect_Data_Model = new Connect_Giadichvu__M();

class Loaixetnghiem_Controler {
    Runviews = (req, res, next) => {
        res.status(200).json({ message: "Loading Thành Công" }); 
    };
 
    Select_LoaiXetNghiem = (req, res, next) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 7;

        Connect_Data_Model.Select_Loai_Xet_Nghiem__M(page,limit, (error, result) => {
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

    LayTheoIdPhongThietBi = (req, res, next) => {
        const Id_PhongThietBi = req.params.ID;
        Connect_Data_Model.LayTheoIdPhongThietBi_M(Id_PhongThietBi,(error, result) => {
        if (error) return next(error);
        if (result.length === 0) return res.status(404).json({ message: "Không có Loai_Xet_Nghiem hệ thống" }); 
        res.status(200).json(result);
        });
    };

    Add_LoaiXetNghiem = (req, res, next) => {
        const GET_Image =  req.file ? req.file.filename : 'AnhMacDinhKetQuaXetNghiem.png';
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
    
    Detail_LoaiXetNghiem = (req, res, next) => {
    const { ID } = req.params;

    Connect_Data_Model.Get_Detail_LoaiXetNghiem__M(ID, (error, result) => {
        if (error) return next(error);
        if (!result) return res.status(404).json({ message: "Không tìm thấy loại xét nghiệm" });
        res.status(200).json({ message: "Lấy chi tiết loại xét nghiệm thành công", data: result });
    });
};


Upload_LoaiXetNghiem = (req, res, next) => {
    const { ID } = req.params;

    // Lấy image mới nếu có
    const GET_Image = req.file ? req.file.filename : undefined;

    // Log thông tin request
    console.log("======== UPDATE LOAI XET NGHIEM ========");
    console.log("ID:", ID);
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    console.log("GET_Image:", GET_Image);

    const data = {
        Id_PhongThietBi: req.body.Id_PhongThietBi?.trim(),
        Id_GiaDichVu : req.body.Id_GiaDichVu?.trim(),
        MoTaXetNghiem : req.body.MoTaXetNghiem?.trim(),
        TenXetNghiem : req.body.TenXetNghiem?.trim(),
        TrangThaiHoatDong: req.body.TrangThaiHoatDong ?? true
    };

    if (GET_Image) {
        data.Image = GET_Image;
    }

    console.log("DATA SEND TO DB:", data);

    Connect_Data_Model.Upload_Loai_Xet_Nghiem__M(ID, data, (error, result) => {
        if (error) {
            console.error("DB UPDATE ERROR:", error);
            return res.status(500).json({ message: "Cập nhật Loai_Xet_Nghiem thất bại" });
        }
        if (!result) {
            console.log("Không tìm thấy Loai_Xet_Nghiem để cập nhật");
            return res.status(404).json({ message: "Không tìm thấy Loai_Xet_Nghiem để cập nhật" });
        }
        console.log("UPDATED DATA:", result);
        res.status(200).json({ message: "Cập nhật Loai_Xet_Nghiem thành công", data: result });
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
