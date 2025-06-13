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

    LayTheoPhieuKhamBenh = (req, res, next) => {
        const Id_PhieuKhamBenh = req.query.Id_PhieuKhamBenh;
        if(!Id_PhieuKhamBenh) return res.status(404).json({ message: "Không có mã phiếu khám bệnh" });
        Connect_Data_Model.LayTheoPhieuKhamBenh_M (Id_PhieuKhamBenh ,(error, result) => {
            if (error) return next(error);
            if (!result || result.length < 1) return res.status(404).json({ message: "Dữ liệu chỉ số sinh tồn rỗng" });
            res.status(200).json(result);
        });
    };


    Add_Chisosinhton__C = (req, res, next) => {
        const Data__Add = {
            Id_PhieuKhamBenh: req.body.Id_PhieuKhamBenh && req.body.Id_PhieuKhamBenh !== "undefined" ? req.body.Id_PhieuKhamBenh.trim() : undefined,
            NhietDo: req.body.NhietDo && req.body.NhietDo !== "undefined" ? req.body.NhietDo.trim() : undefined,
            Mach: req.body.Mach && req.body.Mach !== "undefined" ? req.body.Mach.trim() : undefined,
            HuyetAp: req.body.HuyetAp && req.body.HuyetAp !== "undefined" ? req.body.HuyetAp.trim() : undefined,
            NhipTho: req.body.NhipTho && req.body.NhipTho !== "undefined" ? req.body.NhipTho.trim() : undefined,
            ChieuCao: req.body.ChieuCao && req.body.ChieuCao !== "undefined" ? req.body.ChieuCao.trim() : undefined,
            BMI: req.body.BMI && req.body.BMI !== "undefined" ? req.body.BMI.trim() : undefined,
            SP02: req.body.SP02 && req.body.SP02 !== "undefined" ? req.body.SP02.trim() : undefined,
            CanNang: req.body.CanNang && req.body.CanNang !== "undefined" ? req.body.CanNang.trim() : undefined,
        };

        // Lọc bỏ các thuộc tính có giá trị undefined
        const filteredData = Object.fromEntries(
            Object.entries(Data__Add).filter(([_, value]) => value !== undefined)
        );
        if(!Data__Add.Id_PhieuKhamBenh){
            return res.status(500).json({ message: "Thiếu Id_PhieuKhamBenh"});
        }

        Connect_Data_Model.Add_Chi_So_Sinh_Ton_M (filteredData , (err, result) => {
            if (err) return res.status(500).json({ message: "Thêm chỉ số sinh tồn thất bại", error: err });
            res.status(201).json({ message: "Thêm chỉ số sinh tồn thành công", data: result }); 
        });
    };

      


    Upload_Chisosinhton__C  = (req, res, next) => {
        const { ID  } = req.params;
        if (!ID ) return res.status(400).json({ message: "Thiếu ID để sửa chỉ số sinh tồn" }); 
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
            return res.status(200).json(Result); 
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
