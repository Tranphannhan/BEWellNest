
const connectDB = require("../Model/Db");
const Bac_Si = require("../Schema/Bacsi"); 
const Phieu_Kham_Benh = require("../Schema/Phieu_Kham_Benh"); 

class Database_Bacsi {
  // Lấy danh sách bác sĩ
  Select_Bacsi_M = async (page,limit,Callback) => {
    try {
      const skip = (page - 1)* limit
      await connectDB();
      const Select_Bacsi = await Bac_Si.find({}).populate([
        {
        path:"ID_Khoa"
      },  
      {
        path:"Id_PhongKham"
      }
      ]).skip(skip).limit(limit);

      const total = await Bac_Si.countDocuments({})

      Callback(null, {totalItems:total, currentPage: page, totalPages: Math.ceil(total/limit),data:Select_Bacsi});
    } catch (error) {
      Callback(error);
    }
  };

  Get_ByTrangThaiHoatDong_M = async (page,limit,TrangThaiHoatDong,Callback) => {
    try {
      const skip = (page - 1)* limit
      await connectDB();
      const Select_Bacsi = await Bac_Si.find({TrangThaiHoatDong:TrangThaiHoatDong}).populate({
        path:"ID_Khoa"
      }).skip(skip).limit(limit);

      const total = await Bac_Si.countDocuments({TrangThaiHoatDong:TrangThaiHoatDong})
      Callback(null, {totalItems:total, currentPage: page, totalPages: Math.ceil(total/limit),data:Select_Bacsi});
    } catch (error) {
      Callback(error);
    }
  };


  Get_Dettail_M = async (id,Callback) => {
    try {
      await connectDB();
      const Select_Bacsi = await Bac_Si.find({_id:id}).populate({
        path:"ID_Khoa"
      });
      Callback(null, Select_Bacsi);
    } catch (error) {
      Callback(error);
    }
  };

  Get_ByKhoa_M = async (page,limit,id,Callback) => {
    try {
      const skip = (page - 1)* limit
      await connectDB();
      const Select_Bacsi = await Bac_Si.find({ID_Khoa:id, TrangThaiHoatDong:true}).populate([
       {
          path:'Id_PhongKham',
          select:'SoPhongKham'
       }
]).select('TenBacSi').skip(skip).limit(limit).lean();

      const data = await Promise.all(
      Select_Bacsi.map(async (item)=>{
        const SoNguoiDangKham = await this.DemSoLuongNguoiDangKham__M(item._id);
            return {
          ...item,
          SoNguoiDangKham
        };
      })
      )

      const total = await Bac_Si.countDocuments({ID_Khoa:id})
      data.sort((a,b)=>a.SoNguoiDangKham - b.SoNguoiDangKham)
      
      Callback(null, {totalItems:total, currentPage: page, totalPages: Math.ceil(total/limit),data:data});
    } catch (error) {
      Callback(error);
    }
  };


    DemSoLuongNguoiDangKham__M = async (Id_Bacsi) => {
    try {
      await connectDB();
      const ngayHienTai = new Date().toISOString().split('T')[0];
      const count = await Phieu_Kham_Benh.countDocuments({
        Id_Bacsi: Id_Bacsi,
        Ngay: ngayHienTai,
        TrangThaiThanhToan: true,
        TrangThai: false,
        TrangThaiHoatDong:'Kham'
      });  
    
      return count
    } catch (error) {
      return error
    }
  };



  Select_Image_Bacsi_M = async (ID) => {
    await connectDB();
    const bacsi = await Bac_Si.findById(ID);
    return bacsi?.Image || null;
  };

  Check_SoDienThoai_register = async (SoDienThoai) => {
  try {
    await connectDB();

    const bacsi = await Bac_Si.findOne({ SoDienThoai: SoDienThoai });

    // Nếu đã tìm thấy => số điện thoại đã tồn tại => return false
    if (bacsi) {
      return false;
    }

    // Nếu không tìm thấy => số điện thoại chưa tồn tại => return true
    return true;

  } catch (error) {
    console.error("Lỗi kiểm tra số điện thoại:", error);
    throw error;
  }
}



  Check_Login__M = async (SDT_Login , Callback) => {
    try {
        await connectDB ();
        const Result_Request = await Bac_Si.findOne ({SoDienThoai : SDT_Login}).populate({
          path:"ID_Khoa",
        });
        Callback (null , Result_Request);
    } catch {
        Callback(error);
    }
  }



  // Thêm bác sĩ
  Insert_Bacsi_M = async (data, Callback) => {
    try {
      await connectDB();
      console.log(data)
      const newBacsi = new Bac_Si(data);
      const saved = await newBacsi.save();
      Callback(null, saved);
    } catch (error) {
      Callback(error);
    }
  };

  // Cập nhật bác sĩ
  Update_Bacsi_M = async (id, updatedData, Callback) => {
    try {
      await connectDB();
      const updated = await Bac_Si.findByIdAndUpdate (id, updatedData, { new: true });
      Callback(null, updated);
    } catch (error) {
      Callback(error);
    }
  };

  // Xóa bác sĩ
  Delete_Bacsi_M = async (id, Callback) => {
    try {
      await connectDB();
      const deleted = await Bac_Si.findByIdAndDelete(id);
      Callback(null, deleted);
    } catch (error) {
      Callback(error);
    }
  };
}


module.exports = Database_Bacsi;
