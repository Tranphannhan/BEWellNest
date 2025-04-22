
const connectDB = require("../Model/Db");
const Phieu_Kham_Benh = require("../Schema/Phieu_Kham_Benh"); 

class Database_Phieu_Kham_Benh {
    Select_Phieukhambenh_M = async (Callback) => {
        try {
            await connectDB();
            const Select_Phieukhambenh = await Phieu_Kham_Benh.find({});
            Callback(null, Select_Phieukhambenh);
        } 
        
        catch (error) {
            Callback(error);
        }   
    };


    Add_Phieukhambenh_M = async (Data , Callback) => {
        try {
            await connectDB();
            const Add_New = new Phieu_Kham_Benh (Data);
            const Result = await Add_New.save();
            Callback (null , Result);
        }

        catch (error) {
            Callback(error);
        }
    }


    Edit_Phieukhambenh_M = async (id , Data , Callback) => {
        try {
            await connectDB();
            const Result = await Phieu_Kham_Benh.findByIdAndUpdate (id , Data ,  { new: true });
            Callback (null , Result);
        }

        catch (error) {
            Callback(error);
        }
    }

    Delete_Phieukhambenh_M =  async (id , Callback) => {
        try {
            await connectDB();
            const Result = await Phieu_Kham_Benh.findByIdAndDelete (id);
            Callback (null , Result);
        }

        catch (error) {
            Callback(error);
        }
    }
}

module.exports = Database_Phieu_Kham_Benh;
