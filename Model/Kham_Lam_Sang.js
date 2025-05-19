
const connectDB = require("../Model/Db");
const Khamlamsang = require("../Schema/Kham_Lam_Sang"); 

class Database_Khamlamsang {
    Select_Phieukhambenh_M = async (Callback) => {
        try {
            await connectDB();
            const Select_Khamlamsang = await Khamlamsang.find({});
            Callback(null, Select_Khamlamsang);
        } 
        
        catch (error) {
            Callback(error);
        }      
    };


    Detail__M = async (_id , Callback) => {
        try {
            await connectDB ();
            const Select_Detail = await Khamlamsang.find ({_id});
            Callback(null, Select_Detail);
        } catch (error) {
            Callback(error);
        }   
    }
  

    GET_PhieuKhamBenh__M = async (Id_PhieuKhamBenh , Callback) => {
        try {
            await connectDB ();
            const Select_Detail = await Khamlamsang.find ({Id_PhieuKhamBenh});
            Callback(null, Select_Detail);
        } catch (error) {
            Callback(error);
        }   
    }



    Add_Kham_Lam_Sang_M = async (Data , Callback) => {
        try {
            await connectDB();
            const Add_New = new Khamlamsang (Data);
            const Result = await Add_New.save();
            Callback (null , Result);
        }

        catch (error) {
            Callback(error);
        }
    }


    Edit_Kham_Lam_Sang_M = async (id , Data , Callback) => {
        try {
            await connectDB();
            const Result = await Khamlamsang.findByIdAndUpdate (id , Data ,  { new: true });
            Callback (null , Result);
        }

        catch (error) {
            Callback(error);
        }
    }

    
    Delete_Kham_Lam_Sang_M =  async (id , Callback) => {
        try {
            await connectDB();
            const Result = await Khamlamsang.findByIdAndDelete (id);
            Callback (null , Result);
        }

        catch (error) {
            Callback(error);
        }
    }
}

module.exports = Database_Khamlamsang;
