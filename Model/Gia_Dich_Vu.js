
const connectDB = require("../Model/Db");
const Hoadon = require("../Schema/Gia_Dich_Vu"); 

class Database_Dichvu {
    Select_Giadichvu__M = async (Callback) => {
        try {
            await connectDB();
            const Select_Giadichvu = await Hoadon.find({});
            Callback(null, Select_Giadichvu);
        } catch (error) {
            Callback(error);
        }    
    };


    Add_Giadichvu__M = async (Data , Callback) => {
        try {
            await connectDB();
            const Add_New = new Hoadon (Data);
            const Result = await Add_New.save();
            Callback (null , Result);
        } catch (error) {
            Callback(error);
        }
    }
   
    SuaTrangThai__M = async (id , TrangThaiHoatDong , Callback) => {
        try {
            await connectDB();
            const Result = await Hoadon.findByIdAndUpdate (id ,{ TrangThaiHoatDong : TrangThaiHoatDong} ,  { new: true });
            Callback (null , Result);
        } catch (error) {
            Callback(error);
        }
    }


    Upload_Giadichvu__M = async (id , Data , Callback) => {
        try {
            await connectDB();
            const Result = await Hoadon.findByIdAndUpdate (id , Data ,  { new: true });
            Callback (null , Result);
        } catch (error) {
            Callback(error);
        }
    }

    
    Delete_Giadichvu__M =  async (id , Callback) => {
        try {
            await connectDB();
            const Result = await Hoadon.findByIdAndDelete (id);
            Callback (null , Result);
        } catch (error) {
            Callback(error);
        }
    }
}

module.exports = Database_Dichvu;
