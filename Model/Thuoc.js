
const connectDB = require("../Model/Db");
const Thuoc = require("../Schema/Thuoc"); 
   
class Database_Thuoc {
    Select_Thuoc__M = async (Callback) => {
        try {
            await connectDB();
            const Select_Thuoc = await Thuoc.find({});
            Callback(null, Select_Thuoc);
        } catch (error) {
            Callback(error);
        }   
    };


    Add_Thuoc__M = async (Data , Callback) => {
        try {
            await connectDB();
            const Add_New = new Thuoc (Data);
            const Result = await Add_New.save();
            Callback (null , Result);
        } catch (error) {
            Callback(error);
        }
    }


    Edit_Dongthuoc__M = async (id , Data , Callback) => {
        try {
            await connectDB();
            const Result = await Thuoc.findByIdAndUpdate (id , Data ,  { new: true });
            Callback (null , Result);
        } catch (error) {
            Callback(error);
        }
    }


    Delete_Donthuoc__M =  async (id , Callback) => {
        try {
            await connectDB();
            const Result = await Thuoc.findByIdAndDelete (id);
            Callback (null , Result);
        } catch (error) {
            Callback(error);
        }
    }

    Get_Pagination_M = async (page,limit,Callback) => {
        try {
            const skip = (page - 1) * limit;
            await connectDB();
            const Select_Thuoc = await Thuoc.find({}).skip(skip).limit(limit);
            const total = await Thuoc.countDocuments()
            Callback(null, {totalItems:total, currentPage: page, totalPages: Math.ceil(total/limit),data:Select_Thuoc});
        } catch (error) {
            Callback(error);
        }   
    };
}

module.exports = Database_Thuoc;
