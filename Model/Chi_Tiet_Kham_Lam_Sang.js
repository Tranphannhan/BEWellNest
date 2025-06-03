

const connectDB = require("../Model/Db");
const Chitietkhamlamsang = require("../Schema/Chi_Tiet_Kham_Lam_Sang"); 
const Kham_Lam_Sang = require ("../Schema/Kham_Lam_Sang");
const Phieu_Kham_Benh = require ("../Schema/Phieu_Kham_Benh");

class Database_ChiTietKhamLamSang {
    Select_Chitietkhambenh__M = async (Callback) => {
        try {
            await connectDB();
            const data = await Chitietkhamlamsang.find({});
            Callback(null, data);
        } catch (error) {
            Callback(error);
        }   
    };


    add_Chitietkhambenh_M = async (Data , Callback) => {
        try {
            await connectDB();
            const Add_New = new Chitietkhamlamsang (Data);
            const Result = await Add_New.save();
            Callback (null , Result);
        } catch (error) {
            Callback(error);
        }
    }   
  


    // Đăng sửa tại chỗ này ... 
    Upload_Chitietkhambenh__M = async (ID , _id , Data , Callback) => {
        try {
            await connectDB();
            const Result_Id_PhieuKhamBenh =  await Kham_Lam_Sang.find({_id }).select('Id_PhieuKhamBenh');
            if (!Result_Id_PhieuKhamBenh[0].Id_PhieuKhamBenh) return Callback (null , 'x');
            const Result_Static__Phieukhambenh = await Phieu_Kham_Benh.find ({_id : Result_Id_PhieuKhamBenh[0].Id_PhieuKhamBenh})
                .select('TrangThaiThanhToan');
                
            // Upload
            if (Result_Static__Phieukhambenh[0].TrangThaiThanhToan) return Callback (null , 'Phiếu khám bệnh đã được khám bạn không được phép sửa');
            const Upload = await Chitietkhamlamsang.findByIdAndUpdate(ID , Data, { new: true });
            Callback (null , Upload);
        } catch (error) {
            Callback(error);
        }
    }
  


    Delete_Chitietkhambenh__M =  async (ID , _id , Callback) => {
       try {
            await connectDB();
            const Result_Id_PhieuKhamBenh =  await Kham_Lam_Sang.find({_id }).select('Id_PhieuKhamBenh');
            if (!Result_Id_PhieuKhamBenh[0].Id_PhieuKhamBenh) return Callback (null , 'x');
            const Result_Static__Phieukhambenh = await Phieu_Kham_Benh.find ({_id : Result_Id_PhieuKhamBenh[0].Id_PhieuKhamBenh})
                .select('TrangThaiThanhToan');
                
            // Upload
            if (Result_Static__Phieukhambenh[0].TrangThaiThanhToan) return Callback (null , 'Phiếu khám bệnh đã được khám bạn không được phép xóa');
            const Result = await Chitietkhamlamsang.findByIdAndDelete (ID);
            if (!Result) return Callback (null , "Xóa chi tiết phiếu khám bệnh thất bại");
            Callback (null , "Xóa chi tiết phiếu khám bệnh thành công");

        } catch (error) {
            Callback(error);
        }
    }



}

module.exports = Database_ChiTietKhamLamSang;
