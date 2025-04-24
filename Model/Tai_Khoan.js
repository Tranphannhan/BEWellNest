
const connectDB = require("../Model/Db");
const Taikhoan = require("../Schema/Tai_Khoan"); 

class Database_Taikhoan {
    Select_Tai_Khoan_M = async (Callback) => {
        try {
            await connectDB();
            const Select_Taikhoan = await Taikhoan.find({});
            Callback(null, Select_Taikhoan);
        } 
        
        catch (error) {
            Callback(error);
        }   
    };


    Add_Tai_Khoan_M = async (Data , Callback) => {
        try {
            await connectDB();
            const Add_New = new Taikhoan (Data);
            const Result = await Add_New.save();
            Callback (null , Result);
        }

        catch (error) {
            Callback(error);
        }
    }


    Edit_Tai_Khoan_M = async (id , Data , Callback) => {
        try {
            await connectDB();
            const Result = await Taikhoan.findByIdAndUpdate (id , Data ,  { new: true });
            Callback (null , Result);
        }

        catch (error) {
            Callback(error);
        }
    }


    Delete_Tai_Khoan_M =  async (id , Callback) => {
        try {
            await connectDB();
            const Result = await Taikhoan.findByIdAndDelete (id);
            Callback (null , Result);
        }

        catch (error) {
            Callback(error);
        }
    }
}

module.exports = Database_Taikhoan;
