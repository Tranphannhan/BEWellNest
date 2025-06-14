
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
 

TimKiemTenThuoc__M = async (Key_Search, Id_NhomThuoc, Callback) => {
    try {
        await connectDB();

        const query = {};

        // Gán điều kiện theo nhóm thuốc nếu có
        if (Id_NhomThuoc) {
            query.Id_NhomThuoc = Id_NhomThuoc;
        }

        // Gán điều kiện tìm kiếm theo tên thuốc nếu có
        if (Key_Search) {
            query.TenThuoc = { $regex: '^' + Key_Search, $options: 'i' }; // bắt đầu bằng từ khóa
        }

        const Select_Thuoc = await Thuoc.find(query).limit(7);
        const total = await Thuoc.countDocuments(query);

        Callback(null, {
            totalItems: total,
            currentPage: 1,
            totalPages: Math.ceil(total / 7),
            data: Select_Thuoc
        });
    } catch (error) {
        Callback(error);
    }
};



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
            await connectDB();
            const Select_Thuoc = await Thuoc.find({}).populate([
                {path:"Id_NhomThuoc"},
            ]).skip(skip).limit(limit);
            const total = await Thuoc.countDocuments({})
            Callback(null, {totalItems:total, currentPage: page, totalPages: Math.ceil(total/limit),data:Select_Thuoc});
        } catch (error) {
            Callback(error);
        }   
    };

}

module.exports = Database_Thuoc;
