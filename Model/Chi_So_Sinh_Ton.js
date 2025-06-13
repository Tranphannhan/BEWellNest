


const connectDB = require("../Model/Db");
const Chitietkhamlamsang = require("../Schema/Chi_Tiet_Kham_Lam_Sang"); 
const Kham_Lam_Sang = require ("../Schema/Kham_Lam_Sang");
const Phieu_Kham_Benh = require ("../Schema/Phieu_Kham_Benh");

const Chisosinhton = require ('../Schema/Chi_So_Sinh_Ton');


class Database_Chi_So_Sinh_Ton {
    Select_Chi_So_Sinh_Ton__M = async (Callback) => {
        try {
            await connectDB();
            const data = await Chisosinhton.find({});
            Callback(null, data);
        } catch (error) {
            Callback(error);
        }       
    };

    LayTheoPhieuKhamBenh_M = async (Id_PhieuKhamBenh,Callback) => {
        try {
            await connectDB();
            const data = await Chisosinhton.find({Id_PhieuKhamBenh:Id_PhieuKhamBenh});
            Callback(null, data);
        } catch (error) {
            Callback(error);
        }       
    };


    Add_Chi_So_Sinh_Ton_M = async (Data , Callback) => {
        try {
            await connectDB();
            const Add_New = new Chisosinhton (Data);
            const Result = await Add_New.save();
            Callback (null , Result);
        } catch (error) {
            Callback(error);
        }
    }

   

    Upload_Chisosinhton__M =  async (_id  , Data , Callback) => {
        try {
            await connectDB();
            const Result_Static__Phieukhambenh = await Chisosinhton.find ({_id })
                .select('Id_PhieuKhamBenh');
            const Check__Status = await Phieu_Kham_Benh.find ({_id : Result_Static__Phieukhambenh[0].Id_PhieuKhamBenh})  
                .select('TrangThaiThanhToan');
                
            // Upload
            if (Check__Status[0].TrangThaiThanhToan) return Callback (null , 'Chỉ số sinh tồn của bạn không được phép sửa');
            const Upload = await Chisosinhton.findByIdAndUpdate(_id , Data, { new: true });
            Callback (null , Upload);


        } catch (error) {
            Callback(error);
        }
    } 



    Delete__chisosinhton__M  =  async (_id , Callback) => {
       try {
           await connectDB();
            const Result_Static__Phieukhambenh = await Chisosinhton.find ({_id })
                .select('Id_PhieuKhamBenh');
            const Check__Status = await Phieu_Kham_Benh.find ({_id : Result_Static__Phieukhambenh[0].Id_PhieuKhamBenh})  
                .select('TrangThaiThanhToan');
                
            // Delete -- 
            if (Check__Status[0].TrangThaiThanhToan) return Callback (null , 'Phiếu khám bệnh đã được khám bạn không được phép xóa');
            const Result = await Chisosinhton.findByIdAndDelete (_id);
            if (!Result) return Callback (null , "Xóa chỉ số sinh tồn thất bại");
            Callback (null , "Xóa chi chỉ số sinh tồn thành công");
        } catch (error) {
            Callback(error);
        }
    }







}

module.exports = Database_Chi_So_Sinh_Ton;
