  
const connectDB = require("../Model/Db");
const Loaixetnghiem = require("../Schema/Loai_Xet_Nghiem"); 

class Database_Loaixetnghiem {
    Select_Giadichvu__M = async (Callback) => {
        try {
            await connectDB();
            const Select_Giadichvu = await Loaixetnghiem.find({});
            Callback(null, Select_Giadichvu);
        } catch (error) {
            Callback(error);
        }    
    };

    LayTheoIdPhongThietBi_M = async (Id_PhongThietBi,Callback) => {
        try {
            await connectDB();
            const data = await Loaixetnghiem.find({Id_PhongThietBi}).populate([
                { path:"Id_GiaDichVu",
                select:'Giadichvu'},
                {path:"Id_PhongThietBi",
                    select:"TenPhongThietBi"
                }
            ]
               
            );
            Callback(null, data);
        } catch (error) {
            Callback(error);
        }    
    };

    Add_Loai_Xet_Nghiem__M = async (Data , Callback) => {
        try {
            await connectDB();
            const Add_New = new Loaixetnghiem (Data);
            const Result = await Add_New.save();
            Callback (null , Result);
        } catch (error) {
            Callback(error);
        }
    }

    ThayDoiTrangThaiHoatDong_M = async (TrangThaiHoatDong , _id , Callback) => {
        try {
            await connectDB();
            const Result = await Loaixetnghiem.findByIdAndUpdate (_id , {TrangThaiHoatDong}  ,  { new: true });
            Callback (null , Result);
        } catch (error) {
            Callback(error);
        }
    }


    Upload_Loai_Xet_Nghiem__M = async (id , Data , Callback) => {
        try {
            await connectDB();
            const Result = await Loaixetnghiem.findByIdAndUpdate (id , Data ,  { new: true });
            Callback (null , Result);
        } catch (error) {
            Callback(error);
        }
    }

    
    Delete_Loai_Xet_Nghiem__M =  async (id , Callback) => {
        try {
            await connectDB();
            const Result = await Loaixetnghiem.findByIdAndDelete (id);
            Callback (null , Result);
        } catch (error) {
            Callback(error);
        }
    }
}

module.exports = Database_Loaixetnghiem;
