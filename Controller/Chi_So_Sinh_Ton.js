const Connect_Cakham = require("../Model/Chi_So_Sinh_Ton");
const Connect_Data_Model = new Connect_Cakham();


class Chisosinhton_Controler {
    Select_Chisosinhton__C = (req, res, next) => {
        Connect_Data_Model.Select_Chi_So_Sinh_Ton__M ((error, result) => {
            if (error) return next(error);
            if (!result || result.length < 1) return res.status(404).json({ message: "Dữ liệu chỉ số sinh tồn rỗng" });
            res.status(200).json(result);
        });
    };


    Add_Chisosinhton__C = (req, res, next) => {
        const Data__Add = {
            Id_PhieuKhamBenh: req.body.Id_PhieuKhamBenh?.trim(),
            NhietDo: req.body.NhietDo?.trim(),
            Mach: req.body.Mach?.trim(),
            HuyetAp: req.body.HuyetAp?.trim(),
            NhipTho: req.body.NhipTho?.trim(),
            ChieuCao : req.body.ChieuCao?.trim(),
            BMI: req.body.BMI?.trim(),
            SP02: req.body.SP02?.trim(),
            CanNang: req.body.CanNang?.trim(),  
        };

        Connect_Data_Model.Add_Chi_So_Sinh_Ton_M (Data__Add , (err, result) => {
            if (err) return res.status(500).json({ message: "Thêm chỉ số sinh tồn thất bại", error: err });
            res.status(201).json({ message: "Thêm chỉ số sinh tồn thành công", data: result }); 
        });
    };

      


    Upload_Chisosinhton__C  = (req, res, next) => {
        const { ID  } = req.params;
        if (!ID ) return res.status(400).json({ message: "Thiếu ID để sửa ca khám" }); 
        const Data_Upload  = {
            Id_PhieuKhamBenh: req.body.Id_PhieuKhamBenh?.trim(),
            NhietDo: req.body.NhietDo?.trim(),
            Mach: req.body.Mach?.trim(),
            HuyetAp: req.body.HuyetAp?.trim(),
            NhipTho: req.body.NhipTho?.trim(),
            ChieuCao : req.body.ChieuCao?.trim(),
            BMI: req.body.BMI?.trim(),
            SP02: req.body.SP02?.trim(),
            CanNang: req.body.CanNang?.trim(),  
        }

        Connect_Data_Model.Upload_Chisosinhton__M (ID , Data_Upload , (error, Result) => {
            if (error) return next (error);
            if (!Result) return res.status(404).json({ message: 'Cập nhật thất bại'}); 
            return res.status(404).json({ message: 'Cập nhật thành công' , Data : Result}); 
        });

    };


    Delete__chisosinhton__C  = (req, res, next) => {
        const { ID  } = req.params;
        if (!ID ) return res.status(400).json({ message: "Thiếu ID để xóa ca khám" }); 
        Connect_Data_Model.Delete__chisosinhton__M (ID , (error, Result) => {
            if (error) return next (error);
            if (!Result) return res.status(404).json({ message: 'xóa thất bại'}); 
            return res.status(404).json(Result); 
        });
    };
    


}

module.exports = Chisosinhton_Controler;
