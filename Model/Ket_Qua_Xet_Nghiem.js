
const connectDB = require("../Model/Db");
const Ketquaxetnghiem = require("../Schema/Ket_Qua_Xet_Nghiem"); 

class Database_Ketqua_Xet_Nghiem {
    Select_Ketquaxetnghiem_M = async (Callback) => {
        try {
            await connectDB();
            const Select_Yeucauxetnghiem = await Ketquaxetnghiem.find({});
            Callback(null, Select_Yeucauxetnghiem);
        } catch (error) {
            Callback(error);
        }   
    };


     


    Add_Ketquaxetnghiem_M = async (Data , Callback) => {
        try {
            await connectDB();
            const Add_New = new Ketquaxetnghiem (Data);
            const Result = await Add_New.save();
            Callback (null , Result);
        } catch (error) {
            Callback(error);
        }
    }


    Detail__M = async (_id , Callback) => {
        try {
            await connectDB ();
            const Select_Detail = await Ketquaxetnghiem.find ({_id});
            Callback(null, Select_Detail);
        } catch (error) {
            Callback(error);
        }   
    }


    GET_YeuCauXetNghiem__M = async (Id_YeuCauXetNghiem , Callback) => {
        try {
            await connectDB ();
            const Select = await Ketquaxetnghiem.find ({Id_YeuCauXetNghiem});
            Callback(null, Select);
        } catch (error) {
            Callback(error);
        }   
    }

       
    GETIdPhieuKhamBenh__M = async (Id_PhieuKhamBenh , Callback) => {
        try {
            await connectDB ();
            const Select = await Ketquaxetnghiem.find ({Id_PhieuKhamBenh});
            Callback(null, Select);
        } catch (error) {
            Callback(error);
        }   
    }

    


    Edit_Ketquaxetnghiem_M = async (id , Data , Callback) => {
        try {
            await connectDB();
            const Result = await Ketquaxetnghiem.findByIdAndUpdate (id , Data ,  { new: true });
            Callback (null , Result);
        } catch (error) {
            Callback(error);
        }
    }


    Delete_Ketquaxetnghiem_M =  async (id , Callback) => {
        try {
            await connectDB();
            const Result = await Ketquaxetnghiem.findByIdAndDelete (id);
            Callback (null , Result);
        } catch (error) {
            Callback(error);
        }
    }
}

module.exports = Database_Ketqua_Xet_Nghiem;
