

const connectDB = require("../Model/Db");
const Hoadon = require("../Schema/Hoadon"); 

class Database_Hoadon {
    Select_Hoadon__M = async (page,limit,Callback) => {
        try {
            const skip = (page - 1) * limit
            await connectDB();
            const Select_Hoadon = await Hoadon.find({}).populate({
                path:"Id_PhieuKhamBenh",
                select:"Ngay",
                populate:{
                    path:"Id_TheKhamBenh",
                    select:"HoVaTen"
                }
            }).skip(skip).limit(limit);
            const total = await Hoadon.countDocuments()
            Callback(null,  {totalItems:total, currentPage: page, totalPages: Math.ceil(total/limit),data:Select_Hoadon});
        } catch (error) {
            Callback(error);
        }    
    };


    LayTheoPhieuKhamBenhLoaiHoaDon__M =   async ( _id , LoaiHoaDon ,Callback) => {
        try {
            await connectDB();
            const Select_Hoadon = await Hoadon.find({_id ,LoaiHoaDon }).populate({
                path:"Id_PhieuKhamBenh",
                select:"Ngay",
                populate:{
                    path:"Id_TheKhamBenh",
                    select:"HoVaTen"
                }
            })

            Callback (null , Select_Hoadon);
        } catch (error){
            Callback(error);
        }
    }



    Select_LayTheoLoai__M = async ( LoaiHoaDon ,Callback) => {
        try {
            await connectDB();
            const Select_Hoadon = await Hoadon.find({LoaiHoaDon : LoaiHoaDon}).populate({
                path:"Id_PhieuKhamBenh",
                select:"Ngay",
                populate:{
                    path:"Id_TheKhamBenh",
                    select:"HoVaTen"
                }
            })

            Callback (null , Select_Hoadon);
        } catch (error){
            Callback(error);
        }
    }

   
    Detail__M = async (_id , Callback) => {
        try {
            await connectDB ();
            const Select_Detail = await Hoadon.find ({_id});
            Callback(null, Select_Detail);
        } catch (error) {
            Callback(error);
        }   
    }


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
