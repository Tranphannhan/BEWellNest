  
const connectDB = require("../Model/Db");
const Loai_Tai_Khoan = require("../Schema/Loai_Tai_Khoan"); 

class Database_Loaitaikhoan {
    Select_Loaitaikhoan_M = async (Callback) => {
        try {
            await connectDB();
            const Select_Loai_Tai_Khoan = await Loai_Tai_Khoan.find({});
            Callback(null, Select_Loai_Tai_Khoan);
        } 
        
        catch (error) {
            Callback(error);
        }     
    };


    Add_Loaitaikhoan_M = async (Data , Callback) => {
        try {
            await connectDB();
            const Add_New = new Loai_Tai_Khoan (Data);
            const Result = await Add_New.save();
            Callback (null , Result);
        }

        catch (error) {
            Callback(error);
        }
    }


    Edit_Loaitaikhoan_M = async (id , Data , Callback) => {
        try {
            await connectDB();
            const Result = await Loai_Tai_Khoan.findByIdAndUpdate (id , Data ,  { new: true });
            Callback (null , Result);
        }

        catch (error) {
            Callback(error);
        }
    }

    
    Delete_Loaitaikhoan_M =  async (id , Callback) => {
        try {
            await connectDB();
            const Result = await Loai_Tai_Khoan.findByIdAndDelete (id);
            Callback (null , Result);
        }

        catch (error) {
            Callback(error);
        }
    }
}

module.exports = Database_Loaitaikhoan;
