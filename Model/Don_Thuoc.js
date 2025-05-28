const connectDB = require("../Model/Db");

const Donthuoc = require("../Schema/Don_Thuoc"); 
const Phieu_Kham_Benh = require ('../Schema/Phieu_Kham_Benh');

class Database_Donthuoc {
    Select_Donthuoc_M = async (page,limit,Callback) => {
      try {
        const skip = (page - 1)* limit;
        await connectDB();
        const Select_Donthuoc = await Donthuoc.find({}).populate({
            path: 'Id_PhieuKhamBenh',
            select:'Ngay',
            populate:[
                {
                  path: 'Id_TheKhamBenh',
                  select: 'HoVaTen SoDienThoai'
                },
                {
                  path: 'Id_CaKham',
                  select:'TenCa',
                  populate:{
                    path:'Id_BacSi',
                    select:'TenBacSi'
                  }
                }
            ]
          }).skip(skip).limit(limit);
        const total = await Donthuoc.countDocuments()
        Callback(null, {totalItems:total, currentPage: page, totalPages: Math.ceil(total/limit),data:Select_Donthuoc});
      } catch (error) {
        Callback(error);
      }
    };

    
    // Check đơn thuốc
    Select_Check_Status_Donthuoc_M = async (Id_DonThuoc , Callback) => {
      try {
        await connectDB();
        const Check_Donthuoc = await Donthuoc.find({_id : Id_DonThuoc})
        Callback(null, Check_Donthuoc);
      } catch (error){
        Callback(error);
      }
    }

      
    Detail__M  = async (_id , Callback) => {
        try {
            await connectDB ();
            const Select_Detail = await Donthuoc.find ({_id}).populate({
            path: 'Id_PhieuKhamBenh',
            select:'Ngay',
            populate:[
                {
                  path: 'Id_TheKhamBenh',
                  select: 'HoVaTen SoDienThoai'
                },
                {
                  path: 'Id_CaKham',
                  select:'TenCa',
                  populate:{
                    path:'Id_BacSi',
                    select:'TenBacSi'
                  }
                }
            ]
          })
            Callback(null, Select_Detail);
        } catch (error) {
            Callback(error);
        }   
    }


    GET_Phieu_Kham_Benh__M  = async (Id_PhieuKhamBenh , Callback) => {
        try {
            await connectDB ();
            const Select_Detail = await Donthuoc.find ({Id_PhieuKhamBenh}).populate({
            path: 'Id_PhieuKhamBenh',
            select:'Ngay',
            populate:[
                {
                  path: 'Id_TheKhamBenh',
                  select: 'HoVaTen SoDienThoai'
                },
                {
                  path: 'Id_CaKham',
                  select:'TenCa',
                  populate:{
                    path:'Id_BacSi',
                    select:'TenBacSi'
                  }
                }
            ]
          })
            Callback(null, Select_Detail);
        } catch (error) {
            Callback(error);
        }   
    }




    // Danh sách phát thuốc nhưng có phân trang
    MedicineDistributionList_Pagination_M = async (page,limit,Ngay , Callback) => {
      try {
        const skip = (page - 1)* limit;
        await connectDB();
        const KQ_Select1 = await Phieu_Kham_Benh.find ({Ngay : Ngay}).select ('_id');
        const Arr_ID = KQ_Select1.map (Tm => Tm._id);
        const KQ_Select2 = await Donthuoc.find ({
          Id_PhieuKhamBenh :  Arr_ID,
          TrangThaiThanhToan : true,
          TrangThai : false
        }).populate({
            path: 'Id_PhieuKhamBenh',
            select:'Ngay',
            populate:[
                {
                  path: 'Id_TheKhamBenh',
                  select: 'HoVaTen SoDienThoai'
                },
                {
                  path: 'Id_CaKham',
                  select:'TenCa',
                  populate:{
                    path:'Id_BacSi',
                    select:'TenBacSi'
                  }
                }
            ]
          }).skip(skip).limit(limit)
        const total = await Donthuoc.countDocuments({
          Id_PhieuKhamBenh :  Arr_ID,
          TrangThaiThanhToan : true,
          TrangThai : false
        })
        Callback (null , {totalItems:total, currentPage: page, totalPages: Math.ceil(total/limit),data:KQ_Select2});
      } catch (error){
        Callback (error);
      }
    }


  
  Select_Status_Donthuoc__M = async (Ngay , Callback) => {
      try {
        await connectDB();
        const KQ_Select1 = await Phieu_Kham_Benh.find ({Ngay : Ngay}).select ('_id');
        const Arr_ID = KQ_Select1.map (Tm => Tm._id);
        const KQ_Select2 = await Donthuoc.find ({
          Id_PhieuKhamBenh :  Arr_ID,
          TrangThaiThanhToan : true,
          TrangThai : false
        }).populate({
            path: 'Id_PhieuKhamBenh',
            select:'Ngay',
            populate:[
                {
                  path: 'Id_TheKhamBenh',
                  select: 'HoVaTen SoDienThoai'
                },
                {
                  path: 'Id_CaKham',
                  select:'TenCa',
                  populate:{
                    path:'Id_BacSi',
                    select:'TenBacSi'
                  }
                }
            ]
          })

        Callback (null , KQ_Select2);
      } catch (error){
        Callback (error);
      }
    }
  // Danh sách lịch sử phát thuốc nhưng có phân trang
  HistoryOfMedicineDispensing_Pagination_M = async (page,limit,Ngay , Callback) => {
      try {
        const skip = (page - 1)* limit
        await connectDB();
        const KQ_Select1 = await Phieu_Kham_Benh.find ({Ngay : Ngay}).select ('_id');
        const Arr_ID = KQ_Select1.map (Tm => Tm._id);
        const KQ_Select2 = await Donthuoc.find ({
          Id_PhieuKhamBenh :  Arr_ID,
          TrangThaiThanhToan : true,
          TrangThai : true
        }).populate({
            path: 'Id_PhieuKhamBenh',
            select:'Ngay',
            populate:[
                {
                  path: 'Id_TheKhamBenh',
                  select: 'HoVaTen SoDienThoai'
                },
                {
                  path: 'Id_CaKham',
                  select:'TenCa',
                  populate:{
                    path:'Id_BacSi',
                    select:'TenBacSi'
                  }
                }
            ]
          }).skip(skip).limit(limit)
        const total = await Donthuoc.countDocuments({
          Id_PhieuKhamBenh :  Arr_ID,
          TrangThaiThanhToan : true,
          TrangThai : true
        })
        Callback (null , {totalItems:total, currentPage: page, totalPages: Math.ceil(total/limit),data:KQ_Select2});
      } catch (error){
        Callback (error);
      }
    }



    PaymentConfirmation_M = async (id, Callback) =>{
      try {
        await connectDB();
        const Check_Donthuoc = await Donthuoc.findByIdAndUpdate(
        id,
        { $set: { TrangThaiThanhToan: true } },
        { new: true }
      )
        Callback(null, Check_Donthuoc);
      } catch (error){
        Callback(error);
      }
    }


    // Thêm đơn thuốc
    Insert_Donthuoc_M = async (data, Callback) => {
      try {
        await connectDB();
        const newDonthuoc = new Donthuoc(data);
        const saved = await newDonthuoc.save();
        Callback(null, saved);
      } catch (error) {
        Callback(error);
      }
    };

    // Cập nhật đơn thuốc
    Update_Donthuoc_M = async (id, updatedData, Callback) => {
      try {
        await connectDB();
        const updated = await Donthuoc.findByIdAndUpdate(id, updatedData, { new: true });
        Callback(null, updated);
      } catch (error) {
        Callback(error);
      }
    };

    // Xóa đơn thuốc
    Delete_Donthuoc_M = async (id, Callback) => {
      try {
        await connectDB();
        const deleted = await Donthuoc.findByIdAndDelete(id);
        Callback(null, deleted);
      } catch (error) {
        Callback(error);
      }
    };

       // lấy những yêu cầu xét nghiệm chưa thanh toán để load cho thu ngân xem
    Get_Not_yet_paid = async (Callback)=>{
      try{
          await connectDB();
          const result = await Donthuoc.find({
              TrangThaiThanhToan:false
          }).populate({
            path: 'Id_PhieuKhamBenh',
            select:'Ngay',
            populate:{
              path: 'Id_TheKhamBenh',
              select: 'HoVaTen SoDienThoai'
            }
          })

          Callback(null, result)
      }catch(error){
          Callback(error)
      }
  }

  // 
   Upload_Status_handling__M = async (Id_NguoiPhatThuoc,ID  , Callback) => {
    try {
      await connectDB();
      const data = await Donthuoc.findByIdAndUpdate(ID,{ $set: { TrangThai: true, Id_NguoiPhatThuoc: Id_NguoiPhatThuoc}},{ new: true });
      Callback(null, data);
    } catch (error){
      Callback(error)
    }
  }

  SearchDS_M = async (page,limit,search, Callback) => {
  try {
    const skip= (page - 1)* limit;
    await connectDB();

    const matchConditions = [];

    if (search.sdt) {
      matchConditions.push({ 'The_Kham_Benh.SoDienThoai': search.sdt });
    }

    if (search.ten) {
      matchConditions.push({ 'The_Kham_Benh.HoVaTen': { $regex: search.ten, $options: 'i' } });
    }

    if (search.date) {
      matchConditions.push({ 'Phieu_Kham_Benh.Ngay': search.date });
    }

    matchConditions.push({ TrangThaiThanhToan: true });
    matchConditions.push({ TrangThai: false });

    const data = await Donthuoc.aggregate([
      {
        $lookup: {
          from: 'Phieu_Kham_Benh',
          localField: 'Id_PhieuKhamBenh',
          foreignField: '_id',
          as: 'Phieu_Kham_Benh'
        }
      },
      { $unwind: '$Phieu_Kham_Benh' },
      {
        $lookup: {
          from: 'The_Kham_Benh',
          localField: 'Phieu_Kham_Benh.Id_TheKhamBenh',
          foreignField: '_id',
          as: 'The_Kham_Benh'
        }
      },
      { $unwind: '$The_Kham_Benh' },
      ...(matchConditions.length > 0 ? [{ $match: { $and: matchConditions } }] : []),
    ]).skip(skip).limit(limit);
    const total = data.length
    Callback(null, {totalItems:total, currentPage: page, totalPages: Math.ceil(total/limit),data:data});
  } catch (error) {
    Callback(error);
  }
};


}

module.exports = Database_Donthuoc;
