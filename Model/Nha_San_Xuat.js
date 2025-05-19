
const connectDB = require("./Db");
const Nhasanxuat = require("../Schema/Nha_San_Xuat"); 
   
class Database_Nhasanxuat {
    Select_Nhasanxuat__M = async (page ,limit , Callback) => {
        try {
            const skip = (page - 1) * limit;
            await connectDB();
            const Select__Nhasanxuat = await Nhasanxuat.find({})
                .skip(skip)  
                .limit(limit);

            const total = await Nhasanxuat.countDocuments ();   
            Callback(null, {totalItems:total, currentPage: page, totalPages: Math.ceil(total/limit),data:Select__Nhasanxuat});
        } catch (error) {
            Callback(error);
        }   
    };    


    Add_Nhasanxuat__M = async (Data , Callback) => {
        try {
            await connectDB();
            const Add_New = new Nhasanxuat (Data);
            const Result = await Add_New.save();
            Callback (null , Result);
        } catch (error) {
            Callback(error);
        }
    }


    Edit_Nhasanxuat__M = async (id , Data , Callback) => {
        try {
            await connectDB();
            const Result = await Nhasanxuat.findByIdAndUpdate (id , Data ,  { new: true });
            Callback (null , Result);
        } catch (error) {
            Callback(error);
        }
    }

    Delete_Nhasanxuat__M =  async (id , Callback) => {
        try {
            await connectDB();
            const Result = await Nhasanxuat.findByIdAndDelete (id);
            Callback (null , Result);
        } catch (error) {
            Callback(error);
        }
    }
}

module.exports = Database_Nhasanxuat;
