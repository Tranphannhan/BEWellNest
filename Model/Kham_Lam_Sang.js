
const connectDB = require("../Model/Db");
const Khamlamsang = require("../Schema/Kham_Lam_Sang"); 
const Phieu_Kham_Benh = require("../Schema/Phieu_Kham_Benh"); 

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
         

    GET_TheKhamBenh__M = async (page , limit , _id , Callback) => {
        try {
            await connectDB ();
            const skip = (page - 1) * limit;
            const Arr_ID = await Phieu_Kham_Benh.find ({_id}).select('_id');
            const Arr_PhieuKhamBenh = Arr_ID.map (value => value._id);
            // Bước 2: Lấy các khám lâm sàng liên quan tới các phiếu khám bệnh đó
            const KhamLamSangList = await Khamlamsang.find({
                Id_PhieuKhamBenh : { $in: Arr_PhieuKhamBenh }
            }).skip (skip).limit(limit);

            const total = await Khamlamsang.countDocuments ({
                Id_PhieuKhamBenh: { $in: Arr_PhieuKhamBenh }
            });

            Callback(null, {totalItems:total, currentPage: page, totalPages: Math.ceil(total/limit),data:KhamLamSangList});
 
            
        } catch (error) {
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
