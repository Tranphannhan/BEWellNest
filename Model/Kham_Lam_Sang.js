
const connectDB = require("../Model/Db");
const { populate } = require("../Schema/Bacsi");
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



Add_Kham_Lam_Sang_M = async (Data, Callback) => {
  try {
    await connectDB();

    // Kiểm tra xem đã có bản ghi với Id_PhieuKhamBenh chưa
    const existed = await Khamlamsang.findOne({ Id_PhieuKhamBenh: Data.Id_PhieuKhamBenh });

    if (existed) {
      return Callback(null, {Created: true ,message:"Phiếu đã từng tạo kết quả lâm sàng chỉ được phép sửa",data:existed}); // Trả về bản ghi cũ
    }

    const Add_New = new Khamlamsang(Data);
    const Result = await Add_New.save();
    Callback(null, {Created:false ,message:"Tạo kết quả lâm sàng thành công",data:Result});
  } catch (error) {
    Callback(error);
  }
};

         

GET_TheKhamBenh__M = async (page, limit, _id, Callback) => {
    try {
        await connectDB();
        const skip = (page - 1) * limit;

        // Bước 1: Lấy danh sách Phiếu khám bệnh theo Thẻ khám bệnh và sắp xếp theo ngày mới nhất
        const Arr_PhieuKhamBenh = await Phieu_Kham_Benh.find({ Id_TheKhamBenh: _id ,TrangThai:true})
            .sort({ Ngay: -1 }) // Sort từ mới nhất đến cũ nhất
            .select('_id');

        const Arr_PhieuKhamBenh_IDs = Arr_PhieuKhamBenh.map(doc => doc._id);

        // Bước 2: Lấy danh sách KhamLamSang theo danh sách ID trên (không đảm bảo thứ tự)
        const KhamLamSangList = await Khamlamsang.find({
            Id_PhieuKhamBenh: { $in: Arr_PhieuKhamBenh_IDs },
            TrangThaiHoanThanh:true
        })
        .populate({
            path: "Id_PhieuKhamBenh",
            select: "Ngay",
            populate:{
                path:"Id_Bacsi",
                select:'TenBacSi',
                populate:{
                    path:'Id_PhongKham',
                    select:'SoPhongKham'
                }
            }
        });

        // Bước 3: Sắp xếp lại danh sách sau khi populate theo ngày giảm dần
        const sortedList = KhamLamSangList.sort((a, b) => {
            const dateA = new Date(a.Id_PhieuKhamBenh.Ngay);
            const dateB = new Date(b.Id_PhieuKhamBenh.Ngay);
            return dateB - dateA;
        });

        // Bước 4: Cắt phân trang
        const paginatedData = sortedList.slice(skip, skip + limit);

        // Bước 5: Đếm tổng số lượng kết quả
        const total = sortedList.length;

        // Trả kết quả
        Callback(null, {
            totalItems: total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            data: paginatedData
        });

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
