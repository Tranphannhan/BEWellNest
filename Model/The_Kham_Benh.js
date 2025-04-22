
const connectDB = require("../Model/Db");
const The_Kham_Benh = require("../Schema/The_Kham_Benh"); 

class Database_The_Kham_Benh {
    Select_The_khambenh_M = async (Callback) => {
        try {
            await connectDB();
            const Select_The_Kham_Benh = await The_Kham_Benh.find({});
            Callback(null, Select_The_Kham_Benh);
        } 
        
        catch (error) {
            Callback(error);
        }   
    };


    Add_Thekhambenh_M = async (Data , Callback) => {
        try {
            await connectDB();
            const Add_New = new The_Kham_Benh (Data);
            const Result = await Add_New.save();
            Callback (null , Result);
        }

        catch (error) {
            Callback(error);
        }
    }


    Edit_Thekhambenh_M = async (id , Data , Callback) => {
        try {
            await connectDB();
            const Result = await The_Kham_Benh.findByIdAndUpdate (id , Data ,  { new: true });
            Callback (null , Result);
        }

        catch (error) {
            Callback(error);
        }
    }


    Delete_Thekhambenh_M =  async (id , Callback) => {
        try {
            await connectDB();
            const Result = await The_Kham_Benh.findByIdAndDelete (id);
            Callback (null , Result);
        }

        catch (error) {
            Callback(error);
        }
    }
}

module.exports = Database_The_Kham_Benh;
