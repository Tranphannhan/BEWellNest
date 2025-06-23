const connectDB = require("../Model/Db");

const Donthuoc = require("../Schema/Don_Thuoc"); 
const Donthuoc_Chitiet = require("../Schema/Don_Thuoc_Chi_Tiet"); 
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

KiemTraDonThuocDangTao_M = async (TrangThai, Id_PhieuKhamBenh, Callback) => {
  try {
    await connectDB();

    // Bước 1: Tìm đơn thuốc đúng trạng thái
    let data = await Donthuoc.find({
      TrangThai: TrangThai,
      Id_PhieuKhamBenh: Id_PhieuKhamBenh,
    }).populate({
      path: 'Id_PhieuKhamBenh',
      select: 'Ngay',
      populate: [
        {
          path: 'Id_TheKhamBenh',
          select: 'HoVaTen SoDienThoai',
        },
        {
          path: 'Id_Bacsi',
          select: 'TenBacSi',
          populate: {
            path: 'Id_PhongKham',
            select: 'SoPhongKham',
          },
        },
      ],
    });

    // Nếu tìm thấy đơn thuốc đúng trạng thái
    if (data.length > 0) {
      return Callback(null, {
        message: 'Đang có đơn thuốc chờ xác nhận',
        waitForConfirmation: true,
        data,
      });
    }

    // Bước 2: Không có => Tìm đơn gần nhất theo thời gian
    const latestDon = await Donthuoc.findOne({
      Id_PhieuKhamBenh: Id_PhieuKhamBenh,
    })
      .sort({ Gio: -1 }) // thời gian mới nhất
      .populate({
        path: 'Id_PhieuKhamBenh',
        select: 'Ngay',
        populate: [
          {
            path: 'Id_TheKhamBenh',
            select: 'HoVaTen SoDienThoai',
          },
          {
            path: 'Id_Bacsi',
            select: 'TenBacSi',
            populate: {
              path: 'Id_PhongKham',
              select: 'SoPhongKham',
            },
          },
        ],
      });

    return Callback(null, {
      message: 'Không có đơn thuốc chờ xác nhận, đây là đơn gần nhất',
      waitForConfirmation: false,
      data: latestDon || null,
    });
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

      ThayDoiTrangThai_M = async (_id, updatedData, Callback) => {
        try {
          await connectDB();

          if (!_id) {
            return Callback(new Error('Thiếu ID đơn thuốc'));
          }

          const updated = await Donthuoc.findByIdAndUpdate(_id, updatedData, { new: true });
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

Get_Not_yet_paid = async (page, limit, ngay, TrangThaiThanhToan, Callback) => {
  try {
    const skip = (page - 1) * limit;
    await connectDB();

    // Lấy danh sách ID phiếu khám theo ngày
    const KQ_Select1 = await Phieu_Kham_Benh.find({ Ngay: ngay }).select('_id');
    const Arr_ID = KQ_Select1.map(tm => tm._id);

    // Lấy danh sách đơn thuốc
    const data = await Donthuoc.find({
      Id_PhieuKhamBenh: Arr_ID,
      TrangThaiThanhToan: TrangThaiThanhToan,
      TrangThai: 'DaXacNhan'
    })
    .populate({
      path: 'Id_PhieuKhamBenh',
      select: 'Ngay',
      populate: [
        {
          path: 'Id_TheKhamBenh',
          select: 'HoVaTen SoDienThoai'
        },
        {
          path: 'Id_Bacsi',
          select: 'TenBacSi'
        }
      ]
    })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: 1 });

    // 👉 Gọi TinhTongTienDonThuocChiTiet cho từng đơn thuốc
    const dataWithTongTien = [];
    for (const item of data) {
      const tongTien = await this.TinhTongTienDonThuocChiTiet(item._id);
      dataWithTongTien.push({
        ...item.toObject(),
        TongTien: tongTien
      });
    }

    // Tổng số đơn thuốc
    const total = await Donthuoc.countDocuments({
      Id_PhieuKhamBenh: Arr_ID,
      TrangThaiThanhToan: TrangThaiThanhToan
    });

    // Trả kết quả
    Callback(null, {
      totalItems: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      data: dataWithTongTien
    });

  } catch (error) {
        console.error("Lỗi khi lấy đơn thuốc chưa thanh toán:", error); // ✅ In chi tiết
    Callback({ message: 'Lỗi server', error: error?.message || error });
  }
};

// ✅ Đặt hàm này trước khi gọi nó trong Get_Not_yet_paid
 TinhTongTienDonThuocChiTiet = async (Id_DonThuoc) => {
  try {
    const chiTietList = await Donthuoc_Chitiet.find({ Id_DonThuoc })
      .select('SoLuong Id_Thuoc')
      .populate({ path: 'Id_Thuoc', select: 'Gia' });

    let TongTien = 0;
    for (const item of chiTietList) {
      const gia = item?.Id_Thuoc?.Gia || 0;
      const soLuong = item?.SoLuong || 0;
      TongTien += gia * soLuong;
    }

    return TongTien;
  } catch (error) {
    console.error('Lỗi khi tính tổng tiền:', error);
    return 0;
  }
};




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

  TimKiemBenhNhanBangSDTHoacIdTheKhamBenh_M = async (page,limit,TrangThai, TrangThaiThanhToan, Ngay,Id_TheKhamBenh, SoDienThoai, Callback ) => {
      try {
        const skip = (page - 1)* limit;
        const query = {};
        
        if(TrangThai !== null && TrangThai !== undefined){
          query.TrangThai = TrangThai;
        }

        if(TrangThaiThanhToan !== null && TrangThaiThanhToan !== undefined){
          query.TrangThaiThanhToan = TrangThaiThanhToan;
        }

        const search = {}
        if(Id_TheKhamBenh !== null && Id_TheKhamBenh !== undefined){
            search.Id_TheKhamBenh = Id_TheKhamBenh;
        }

        search.Ngay = Ngay;

        let PhieuKhamBenhDaTimQuaId = await Phieu_Kham_Benh.find(search)       
            .populate({ path: "Id_TheKhamBenh" })
            .sort({ STTKham: 1 })
            .lean();
        
                // 2. Nếu có SDT thì lọc thêm theo số điện thoại
        if (SoDienThoai) {
            PhieuKhamBenhDaTimQuaId = PhieuKhamBenhDaTimQuaId.filter(
                item => item.Id_TheKhamBenh?.SoDienThoai === SoDienThoai
            );
        }

        // 3. Lấy danh sách ID
        const danhSachIdLoai = PhieuKhamBenhDaTimQuaId.map(item => item._id);
        
        if (danhSachIdLoai.length === 0) {
          return Callback(null, {
            totalItems: 0,
            currentPage: page,
            totalPages: 0,
            data: []
          });
        }

        // 4. Lấy tất cả các yêu cầu xét nghiệm theo danh sách phiếu khám bệnh
        let dataQuery = { Id_PhieuKhamBenh: { $in: danhSachIdLoai }, ...query };

        await connectDB();
        const Select_Donthuoc = await Donthuoc.find(dataQuery).populate({
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
        const total = await Donthuoc.countDocuments(dataQuery)
        Callback(null, {totalItems:total, currentPage: page, totalPages: Math.ceil(total/limit),data:Select_Donthuoc});
      } catch (error) {
        Callback(error);
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

// Thống kê đơn thuốc 
Filter_Donthuoc_ByDate_M = async (limit, page, { fromDate, toDate, year }) => {
  try {
    await connectDB();
    const skip = (page - 1) * limit;

    let query = {TrangThaiThanhToan:true};

    // Lọc theo khoảng ngày
    if (fromDate && toDate) {
      const start = new Date(fromDate);
      const end = new Date(toDate);
      end.setHours(23, 59, 59, 999); // để bao trọn ngày

      query.createdAt = {
        $gte: start,
        $lte: end,
      };
    }

    // Lọc theo năm
    else if (year) {
      const start = new Date(`${year}-01-01T00:00:00.000Z`);
      const end = new Date(`${year}-12-31T23:59:59.999Z`);

      query.createdAt = {
        $gte: start,
        $lte: end,
      };
    }

    const result = await Donthuoc.find(query).populate({
      path:'Id_PhieuKhamBenh',
      select:'Ngay'
    }).skip(skip).limit(limit).lean();

    // Thêm tổng tiền tạm thời (giá trị ngẫu nhiên từ 100000 đến 400000)
const resultWithTongTien = result.map(item => ({
  ...item,
  TongTien: Math.floor(Math.random() * (400000 - 100000 + 1)) + 100000
}));
    const total = await Donthuoc.countDocuments(query);

    return {
      totalItems: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      data: resultWithTongTien,
    };
  } catch (error) {
    throw error;
  }
};



}

module.exports = Database_Donthuoc;
