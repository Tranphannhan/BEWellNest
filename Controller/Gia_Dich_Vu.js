const Connect_Giadichvu__M = require("../Model/Gia_Dich_Vu");
const Connect_Data_Model = new Connect_Giadichvu__M();

class Giadichvu_Controler {
    Runviews = (req, res, next) => {
        res.status(200).json({ message: "Loading Thành Công" }); 
    };
   

    Select_Giadichvu = (req, res, next) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 7;

        Connect_Data_Model.Select_Giadichvu__M(page , limit , (error, result) => {
        if (error) return next(error);
        if (result.length === 0) return res.status(404).json({ message: "Không có giá dịch vụ trên hệ thống" }); 
        res.status(200).json(result);
        });
    };


    Select_GiaKham = (req, res, next) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 7;

        Connect_Data_Model.Select_GiaKham__M (page , limit , (error, result) => {
        if (error) return next(error);
        if (result.length === 0) return res.status(404).json({ message: "Không có giá dịch vụ trên hệ thống" }); 
        res.status(200).json(result);
        });
    };

    Search = (req, res, next) => {
        const Tendichvu = req.query.Key;
        const limit = parseInt(req.query.limit) || 7;
        const page = parseInt(req.query.page) || 1;
        const Loaigia = req.query.Loaigia;

        if (!Tendichvu || !Loaigia) return res.status(400).json({ message: "Thiếu key tìm kiếm" });

        Connect_Data_Model.Search__M(page, limit, Tendichvu, Loaigia, (error, result) => {
            if (error) return next(error);
            if (!result) return res.status(404).json([]);
            return res.status(200).json(result);
        });
    };


        GetDetail_Giadichvu = (req, res, next) => {
    const { ID } = req.params;

    Connect_Data_Model.GetDetail_Giadichvu__M(ID, (error, result) => {
        if (error) return res.status(500).json({ message: "Lấy chi tiết giá dịch vụ thất bại" });
        if (!result) return res.status(404).json({ message: "Không tìm thấy giá dịch vụ" });

        res.status(200).json(result);
    });
}

  
    Add_Giadichvu = (req, res, next) => {
        const data = {
            Tendichvu: req.body.Tendichvu?.trim(),
            Loaigia : req.body.Loaigia,
            Giadichvu: req.body.Giadichvu,
            TrangThaiHoatDong : true
        };

        Connect_Data_Model.Add_Giadichvu__M (data, (error, result) => {
            if (error) return res.status(500).json({ message: "Thêm giá dịch vụ thất bại"});
            res.status(201).json({ message: "Thêm giá dịch vụ thành công"}); 
        });
    };

  
    // cập nhật trạng thái 
    SuaTrangThai = (req ,res , next) => {
        const { ID } = req.params;
        const GET_Status = req.query.TrangThaiHoatDong;

        Connect_Data_Model.SuaTrangThai__M (ID , GET_Status, (error, result) => {
            if (error) return res.status(500).json({ message: "Cập nhật giá dịch vụ thất bại" , status : false});
            res.status(201).json({ message: "cập nhật Trạng thái thành công" , status : true}); 
        });
    }


    Upload_Giadichvu = (req, res, next) => {
        const { ID } = req.params;
        const data = {
            Tendichvu: req.body.Tendichvu?.trim(),
            Loaigia : req.body.Loaigia,
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
