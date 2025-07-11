
const connectDB = require("./Db");
const NhomThuoc = require("../Schema/Nhom_Thuoc"); 
   
class Database_Nhom_Thuoc {
    Select_Nhom_Thuoc__M = async (limit , page  , Callback) => {
        try {
            const skip = (page - 1) * limit;
            await connectDB();
            const Select_Nhome_NhomThuoc = await NhomThuoc.find({})
            .skip(skip)  
            .limit(limit);

            const total = await NhomThuoc.countDocuments ();   
            Callback(null, {totalItems:total, currentPage: page, totalPages: Math.ceil(total/limit),data: Select_Nhome_NhomThuoc});
        } catch (error) {
            Callback(error);
        }   
    };

    Detail_NhomNhomThuoc__M = async (id, Callback) => {
    try {
        await connectDB();
        const Result = await NhomThuoc.findById(id);
        Callback(null, Result);
    } catch (error) {
        Callback(error);
    }
}




    Add_Nhom_NhomThuoc__M = async (Data , Callback) => {
        try {
            await connectDB();
            const Add_New = new NhomThuoc (Data);
            const Result = await Add_New.save();
            Callback (null , Result);
        } catch (error) {
            Callback(error);
        }
    }


    Edit_NhomNhomThuoc__M = async (id , Data , Callback) => {
        try {
            await connectDB();
            const Result = await NhomThuoc.findByIdAndUpdate (id , Data ,  { new: true });
            Callback (null , Result);
        } catch (error) {
            Callback(error);
        }
    }


    Delete_NhomNhomThuoc__M =  async (id , Callback) => {
        try {
            await connectDB();
            const Result = await NhomThuoc.findByIdAndDelete (id);
            Callback (null , Result);
        } catch (error) {
            Callback(error);
        }
    }
}

module.exports = Database_Nhom_Thuoc;
