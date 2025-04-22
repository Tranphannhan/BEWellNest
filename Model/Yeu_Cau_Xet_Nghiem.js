
const connectDB = require("../Model/Db");
const Yeucauxetnghiem = require("../Schema/Yeu_Cau_Xet_Nghiem"); 

class Database_Yeu_Cau_Xet_Nghiem {
    Select_Yeucauxetnghiem_M = async (Callback) => {
        try {
            await connectDB();
            const Select_Yeucauxetnghiem = await Yeucauxetnghiem.find({});
            Callback(null, Select_Yeucauxetnghiem);
        } 
        
        catch (error) {
            Callback(error);
        }   
    };


    Add_Yeucauxetnghiem_M = async (Data , Callback) => {
        try {
            await connectDB();
            const Add_New = new Yeucauxetnghiem (Data);
            const Result = await Add_New.save();
            Callback (null , Result);
        }

        catch (error) {
            Callback(error);
        }
    }


    Edit_Yeucauxetnghiem_M = async (id , Data , Callback) => {
        try {
            await connectDB();
            const Result = await Yeucauxetnghiem.findByIdAndUpdate (id , Data ,  { new: true });
            Callback (null , Result);
        }

        catch (error) {
            Callback(error);
        }
    }


    Delete_Yeucauxetnghiem_M =  async (id , Callback) => {
        try {
            await connectDB();
            const Result = await Yeucauxetnghiem.findByIdAndDelete (id);
            Callback (null , Result);
        }

        catch (error) {
            Callback(error);
        }
    }
}

module.exports = Database_Yeu_Cau_Xet_Nghiem;
