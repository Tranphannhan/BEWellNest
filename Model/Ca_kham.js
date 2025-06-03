const { path } = require("../app");
const connectDB = require("../Model/Db");
const Cakham = require("../Schema/Cakham"); 
const Phieukhambenh = require ('../Schema/Phieu_Kham_Benh');
const Phong_Kham = require ('../Schema/Phong_Kham')

class Database_Cakham {
    Select_Cakham_M = async (page,limit,Callback) => {
    try {
      const skip = (page - 1)* limit
      await connectDB();
      const Select_Cakham = await Cakham.find({}).populate({
        path:'Id_BacSi',
        select: 'TenBacSi'
      }).populate({
         path:'Id_PhongKham',
        select: 'SoPhongKham',
        populate:{
          path: 'Id_Khoa',
          select: 'TenKhoa'
        }
      }).skip(skip).limit(limit);

      const total = await Cakham.countDocuments()

       Callback(null, {totalItems:total, currentPage: page, totalPages: Math.ceil(total/limit),data:Select_Cakham});
    } catch (error) {
      Callback(error);
    }
  };

  

Get_ByKhoa_M = async (page, limit, Id_LoaiCa, Id_Khoa, Callback) => {
  try {
    const ngay = new Date().toISOString().split('T')[0];
    await connectDB();
    const skip = (page - 1) * limit;

    let ID2 = [];
    // Nếu có Id_Khoa thì tìm các phòng thuộc khoa đó
    if (Id_Khoa) {
      const ID_PhongDuocLoc = await Phong_Kham.find({ Id_Khoa: Id_Khoa }).select('_id');
      ID2 = ID_PhongDuocLoc.map(data => data._id);
        if (ID2.length === 0) {
          return Callback(null, {
            totalItems: 0,
            currentPage: page,
            totalPages: 0,
            data: []
          });
        }
    }

    // Tạo điều kiện lọc linh hoạt
    const query = {};
    if (ID2.length > 0) query.Id_PhongKham = { $in: ID2 };
    if (Id_LoaiCa) query.Id_LoaiCa = Id_LoaiCa;

      // Truy vấn chính
      const Select_Cakham = await Cakham.find({TrangThaiHoatDong:true,...query})
        .populate({
          path: 'Id_BacSi',
          select: 'TenBacSi'
        })
        .populate({
          path: 'Id_PhongKham',
          select: 'SoPhongKham',
          populate: {
            path: 'Id_Khoa',
            select: 'TenKhoa'
          }
        })
        .skip(skip)
        .limit(limit).
        lean();
        
        const data = await Promise.all(
  Select_Cakham.map(async (item) => {
    const SoNguoiDangKham = await this.DemSoLuongNguoiDangKham__M(item._id, ngay);
    return {
      ...item,
      SoNguoiDangKham
    };
  })
);

    const total = await Cakham.countDocuments({TrangThaiHoatDong:true,...query});

    Callback(null, {
      totalItems: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      data: data
    });
  } catch (error) {
    Callback(error);
  }
};


  
  Get_Count_Cakham__M = async (ID_Cakham, Date, Callback) => {
    try {
      await connectDB();
      const count = await Phieukhambenh.countDocuments({
        Id_CaKham: ID_Cakham,
        Ngay: Date,
        TrangThaiThanhToan: true,
        TrangThai: false,
      });  
    
      Callback(null, count);
    } catch (error) {
      Callback(error);
    }
  };

  DemSoLuongNguoiDangKham__M = async (ID_Cakham, Date) => {
    try {
      await connectDB();
      const count = await Phieukhambenh.countDocuments({
        Id_CaKham: ID_Cakham,
        Ngay: Date,
        TrangThaiThanhToan: true,
        TrangThai: false,
      });  
    
      return count
    } catch (error) {
      return error
    }
  };


  // Thêm ca khám
  Insert_Cakham_M = async (data, Callback) => {
    try {
      await connectDB();
      const newCakham = new Cakham(data);
      const saved = await newCakham.save();
      Callback(null, saved);
    } catch (error) {
      Callback(error);
    }
  };

  // Cập nhật ca khám
  Update_Cakham_M = async (id, updatedData, Callback) => {
    try {
      await connectDB();
      const updated = await Cakham.findByIdAndUpdate(id, updatedData, { new: true });
      Callback(null, updated);
    } catch (error) {
      Callback(error);
    }
  };

  // Xóa ca khám
  Delete_Cakham_M = async (id, Callback) => {
    try {
      await connectDB();
      const deleted = await Cakham.findByIdAndDelete(id);
      Callback(null, deleted);
    } catch (error) {
      Callback(error);
    }
  };
}

module.exports = Database_Cakham;
