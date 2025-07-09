
const connectDB = require("../Model/Db");
const Taikhoan = require("../Schema/Tai_Khoan"); 

class Database_Taikhoan {
    Select_Tai_Khoan_M = async (page,limit,Callback) => {
        try {
            await connectDB();
            const skip = (page - 1)* limit;
            const Select_Taikhoan = await Taikhoan.find({}).populate({
                path:"Id_LoaiTaiKhoan"
            }).skip(skip).limit(limit);
            const total = await Taikhoan.countDocuments(); 
            Callback(null, {totalItems:total, currentPage: page, totalPages: Math.ceil(total/limit),data:Select_Taikhoan});
        } catch (error) {
            Callback(error);
        }   
    };

    Get_Tai_Khoan_ById_M = async (id, Callback) => {
    try {
        await connectDB();
        const taiKhoan = await Taikhoan.findById(id).populate({
            path: "Id_LoaiTaiKhoan"
        });
        Callback(null, taiKhoan);
    } catch (error) {
        Callback(error);
    }
};


    Get_ByLoai_M = async (limit , page , Id_Loai,Callback) => {
        try {
            await connectDB();
             const skip = (page - 1)* limit;
            const Select_Taikhoan = await Taikhoan.find({Id_LoaiTaiKhoan: Id_Loai}).populate({
                path:"Id_LoaiTaiKhoan"
            })  
            .skip(skip)  
            .limit(limit);
            const total = await Taikhoan.countDocuments ({Id_LoaiTaiKhoan: Id_Loai}); 
            Callback(null,  {totalItems:total, currentPage: page, totalPages: Math.ceil(total/limit),data:Select_Taikhoan});
        } catch (error) {
            Callback(error);
        }
    };


    Add_Tai_Khoan_M = async (Data , Callback) => {
        try {
            await connectDB();
            const Add_New = new Taikhoan (Data);
            const Result = await Add_New.save();
            Callback (null , Result);
        } catch (error) {
            Callback(error);
        }
    }


    Check_Login__M = async (SDT_Login, Id_LoaiTaiKhoan, Callback) => {
        try {
            await connectDB ();
            const Result_Request = await Taikhoan.findOne ({SoDienThoai : SDT_Login, Id_LoaiTaiKhoan: Id_LoaiTaiKhoan})
                .select('_id Id_LoaiTaiKhoan TenTaiKhoan SoDienThoai SoCCCD Image MatKhau').populate({
                    path:'Id_LoaiTaiKhoan',
                    
                });
                Callback (null , Result_Request);
        } catch {
            Callback(error);
        }
    }

      Check_SoDienThoai_register = async (SoDienThoai) => {
        try {
            await connectDB();

            const data = await Taikhoan.findOne({ SoDienThoai: SoDienThoai });

            // Nếu đã tìm thấy => số điện thoại đã tồn tại => return false
            if (data) {
            return false;
            }

            // Nếu không tìm thấy => số điện thoại chưa tồn tại => return true
            return true;

        } catch (error) {
                console.error("Lỗi kiểm tra số điện thoại:", error);
                throw error;
            }
        }


    Edit_Tai_Khoan_M = async (id , Data , Callback) => {
        try {
            await connectDB();
            const Result = await Taikhoan.findByIdAndUpdate (id , Data ,  { new: true });
            Callback (null , Result);
        } catch (error) {
            Callback(error);
        }
    }


    Delete_Tai_Khoan_M =  async (id , Callback) => {
        try {
            await connectDB();
            const Result = await Taikhoan.findByIdAndDelete (id);
            Callback (null , Result);
        } catch (error) {
            Callback(error);
        }
    }
}

module.exports = Database_Taikhoan;
