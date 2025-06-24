

const connectDB = require("../Model/Db");
const Chitietkhamlamsang = require("../Schema/Chi_Tiet_Kham_Lam_Sang"); 
const Kham_Lam_Sang = require ("../Schema/Kham_Lam_Sang");
const Phieu_Kham_Benh = require ("../Schema/Phieu_Kham_Benh");

class Database_ChiTietKhamLamSang {
    Select_Chitietkhambenh__M = async (Callback) => {
        try {
            await connectDB();
            const data = await Chitietkhamlamsang.find({});
            Callback(null, data);
        } catch (error) {
            Callback(error);
        }   
    };


LayTheoPhieuKhamBenh_M = async (Id_PhieuKhamBenh, Callback) => {
  try {
    await connectDB();

    // ✅ Tìm khám lâm sàng theo phiếu khám bệnh
    const kham = await Kham_Lam_Sang.findOne({ Id_PhieuKhamBenh });

    if (!kham) {
      return Callback(null, []); // Không có khám lâm sàng thì trả mảng rỗng
    }

    // ✅ Tìm danh sách chi tiết theo Id_KhamLamSang
    const chiTiet = await Chitietkhamlamsang.find({ Id_KhamLamSang: kham._id });

    Callback(null, chiTiet);

  } catch (error) {
    Callback(error);
  }
};


    KiemTraCoChiTietKhamLamSang_M = async (id, Callback) => {
    try {
        await connectDB();

        // 1. Tìm tất cả Id_KhamLamSang của phiếu khám bệnh
        const Id_KhamLamSang_List = await Kham_Lam_Sang.find({ Id_PhieuKhamBenh: id }).select('_id');

        // 2. Rút ra mảng id đơn giản
        const ids = Id_KhamLamSang_List.map(item => item._id);

        // 3. Tìm tất cả chi tiết lâm sàng có Id_KhamLamSang nằm trong mảng trên
        const data = await Chitietkhamlamsang.find({
        Id_KhamLamSang: { $in: ids }
        }).sort({ createdAt: -1 }).limit(1);;

        // 4. Trả kết quả
        Callback(null, data);
    } catch (error) {
        Callback(error);
    }
    };



    add_Chitietkhambenh_M = async (Data , Callback) => {
        try {
            await connectDB();
            const Add_New = new Chitietkhamlamsang (Data);
            const Result = await Add_New.save();
            Callback (null , Result);
        } catch (error) {
            Callback(error);
        }
    }   
  


Upload_Chitietkhambenh__M = async (ID, Data, Callback) => {
    try {
        await connectDB();

        // Bước 1: Lấy chi tiết khám lâm sàng hiện tại để lấy Id_KhamLamSang
        const chitiet = await Chitietkhamlamsang.findById(ID).select('Id_KhamLamSang');
        if (!chitiet) {
            return Callback(new Error('Không tìm thấy chi tiết khám lâm sàng.'));
        }

        // Bước 2: Kiểm tra trạng thái hoàn thành của phiếu Kham_Lam_Sang
        const khamLamSang = await Kham_Lam_Sang.findById(chitiet.Id_KhamLamSang).select('TrangThaiHoanThanh');
        if (!khamLamSang) {
            return Callback(new Error('Không tìm thấy phiếu khám lâm sàng.'));
        }

        // Nếu đã hoàn thành thì không cho phép sửa
        if (khamLamSang.TrangThaiHoanThanh === true) {
            return Callback(new Error('Bạn không có quyền sửa khi phiếu khám đã hoàn thành.'));
        }

        // Bước 3: Cho phép sửa nếu chưa hoàn thành
        const Upload = await Chitietkhamlamsang.findByIdAndUpdate(ID, Data, { new: true });
        Callback(null, Upload);
    } catch (error) {
        Callback(error);
    }
};

  


Delete_Chitietkhambenh__M = async ( _id, Callback) => {
  try {
    await connectDB();

    // Bước 1: Tìm chi tiết khám lâm sàng để lấy Id_KhamLamSang
    const chitiet = await Chitietkhamlamsang.findById(_id).select('Id_KhamLamSang');
    if (!chitiet) {
      return Callback(new Error('Không tìm thấy chi tiết khám lâm sàng.'));
    }

    // Bước 2: Tìm phiếu khám lâm sàng từ Id_KhamLamSang
    const kham = await Kham_Lam_Sang.findById(chitiet.Id_KhamLamSang).select('TrangThaiHoanThanh');
    if (!kham) {
      return Callback(new Error('Không tìm thấy phiếu khám lâm sàng.'));
    }

    // Bước 3: Nếu đã hoàn thành thì không được xóa
    if (kham.TrangThaiHoanThanh === true) {
      return Callback(new Error('Bạn không có quyền xóa khi phiếu khám đã hoàn thành.'));
    }

    // Bước 4: Tiến hành xóa
    const Deleted = await Chitietkhamlamsang.findByIdAndDelete(_id);
    Callback(null, Deleted);
  } catch (error) {
    Callback(error);
  }
};




}

module.exports = Database_ChiTietKhamLamSang;
