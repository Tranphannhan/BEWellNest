
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

    
    Get_Detail_M = async (Id ,Callback) => {
        try {
            await connectDB();
            const Select_Thuoc = await Thuoc.find({_id: Id}).populate([
                {path:"Id_NhomThuoc"}
            ]);
            Callback(null, Select_Thuoc);
        } catch (error) {
            Callback(error);
        }   
    };
 

    TimKiemTenThuoc__M = async (Key_Search, Callback) => {
        try {
            await connectDB();
            const Select_Thuoc = await Thuoc.find({
                TenThuoc: { $regex: '^' + Key_Search, $options: 'i' } // Bắt đầu bằng Key_Search
            }).limit(7);

            const total = await Thuoc.countDocuments ({ TenThuoc: { $regex: '^' + Key_Search, $options: 'i' }})
            Callback(null, {totalItems:total, currentPage: 1, totalPages: Math.ceil(total/7 ),data:Select_Thuoc});
        } catch (error) {
            Callback(error);
        }
    } 


    Get_TakeInGroups_M = async (page, limit, Id,Callback) => {
        try {
            const skip = (page - 1) * limit
            await connectDB();
            const Select_Thuoc = await Thuoc.find({Id_NhomThuoc: Id}).populate([
                {path:"Id_NhomThuoc"},
            ]).skip(skip).limit(limit);
            const total = await Thuoc.countDocuments({Id_NhomThuoc: Id})
            Callback(null, {totalItems:total, currentPage: page, totalPages: Math.ceil(total/limit),data:Select_Thuoc});
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
            const ngay = new Date().toISOString().split('T')[0];
            await connectDB();
            const Select_Thuoc = await Thuoc.find({
                  SoLuong: { $gt: 0 },
                 HanSuDung: { $gte: ngay }
            }).populate([
                {path:"Id_NhomThuoc"},
            ]).skip(skip).limit(limit);
            const total = await Thuoc.countDocuments({  
                 SoLuong: { $gt: 0 },
                 HanSuDung: { $gte: ngay }})
            Callback(null, {totalItems:total, currentPage: page, totalPages: Math.ceil(total/limit),data:Select_Thuoc});
        } catch (error) {
            Callback(error);
        }   
    };

}

module.exports = Database_Thuoc;
