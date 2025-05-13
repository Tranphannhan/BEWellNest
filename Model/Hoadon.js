
const connectDB = require("../Model/Db");
const Hoadon = require("../Schema/Hoadon"); 

class Database_Hoadon {
    Select_Hoadon__M = async (Callback) => {
        try {
            await connectDB();
            const Select_Hoadon = await Hoadon.find({});
            Callback(null, Select_Hoadon);
        } catch (error) {
            Callback(error);
        }    
    };


    Add_Hoadon__M = async (Data , Callback) => {
        try {
            await connectDB();
            const Add_New = new Hoadon (Data);
            const Result = await Add_New.save();
            Callback (null , Result);
        } catch (error) {
            Callback(error);
        }
    }


    Update_Hoadon__M = async (id , Data , Callback) => {
        try {
            await connectDB();
            const Result = await Hoadon.findByIdAndUpdate (id , Data ,  { new: true });
            Callback (null , Result);
        } catch (error) {
            Callback(error);
        }
    }

    
    Delete_Hoadon_M =  async (id , Callback) => {
        try {
            await connectDB();
            const Result = await Hoadon.findByIdAndDelete (id);
            Callback (null , Result);
        } catch (error) {
            Callback(error);
        }
    }
}

module.exports = Database_Hoadon;
