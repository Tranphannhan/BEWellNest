
const connectDB = require("../Model/Db");
const Phieu_Kham_Benh = require("../Schema/Phieu_Kham_Benh"); 

class Database_Phieu_Kham_Benh {
Select_Phieukhambenh_M = async (NgayHienTai, TrangThai, TrangThaiHoatDong, Callback) => {
  try {
    await connectDB();

    const query = {};

    if (TrangThai) {
      query["TrangThai"] = TrangThai;
    }

    if (TrangThaiHoatDong) {
      query["TrangThaiHoatDong"] = TrangThaiHoatDong;
    }

    if (NgayHienTai === true || NgayHienTai === 'true') {
      const ngayHienTai = new Date().toISOString().split('T')[0];
      const formattedDate = ngayHienTai;

      query["Ngay"] = formattedDate;
    }

    const total = await Phieu_Kham_Benh.find(query)
    Callback(null, {total:total});
  } catch (error) {
    Callback(error);
  }
};

    

    Select_Check_Status_Phieukhambenh_M = async (Id_PhieuKhamBenh , Callback) => {
        try {
            await connectDB();
            const Check_Donthuoc = await Phieu_Kham_Benh.find({_id : Id_PhieuKhamBenh})
            Callback(null, Check_Donthuoc);
        } catch (error){
            Callback(error);
        }
    }

     Detail__M = async (_id , Callback) => {
        try {
            await connectDB ();
            const Select_Detail = await Phieu_Kham_Benh.find ({_id}).populate({
                path: 'Id_TheKhamBenh',
                }).populate({
                    path: 'Id_Bacsi',
                    populate:
                        {
                        path: 'Id_PhongKham',}
                    
                })
            ;
            Callback(null, Select_Detail);
        } catch (error) {
            Callback(error);
        }   
    }


    GET_LayTheoTheKhamBenh__M  = async (Id_TheKhamBenh , Callback) => {
        try {
            await connectDB ();
            const Select_Detail = await Phieu_Kham_Benh.find ({Id_TheKhamBenh}).populate({
                path: 'Id_TheKhamBenh',
                select: 'HoVaTen SoDienThoai',
                }).populate({
                    path: 'Id_CaKham',
                    select: 'TenCa',
                    populate:[
                        {
                        path: 'Id_BacSi',
                        select: 'TenBacSi'
                            },
                        {
                        path: 'Id_PhongKham',
                        select: 'SoPhongKham'
                            },
                    ] 
                })
            ;
            Callback(null, Select_Detail);
        } catch (error) {
            Callback(error);
        }   
    }

 
Update_SoLanKhongCoMat_M = async (id, Callback) => {
  try {
    await connectDB();

    const record = await Phieu_Kham_Benh.findById(id);
    if (!record) return Callback("Không tìm thấy phiếu khám");

    const soLanMoi = (record.SoLanKhongCoMat || 0) + 1;
    const trangThaiMoi = soLanMoi >= 3 ? "BoQua" : record.TrangThaiHoatDong;

    let updateData = {
      SoLanKhongCoMat: soLanMoi,
      TrangThaiHoatDong: trangThaiMoi,
    };

    // Nếu chưa vượt quá số lần vắng → cập nhật lại STT
    if (soLanMoi < 3) {
      const phieuCungNgayVaBacSi = await Phieu_Kham_Benh.find({
        Ngay: record.Ngay,
        Id_Bacsi: record.Id_Bacsi,
        TrangThaiThanhToan: true
      }).sort({ STTKham: -1 }).limit(1);

      const nextSTT = phieuCungNgayVaBacSi.length === 0
        ? 1
        : phieuCungNgayVaBacSi[0].STTKham + 1;

      updateData.STTKham = nextSTT;
    }

    const updated = await Phieu_Kham_Benh.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    Callback(null, updated);
  } catch (error) {
    Callback(error);
  }
};






    PaymentConfirmation_M = async (id, nextSTT, Callback) => {
        try {
          await connectDB();
          const data = await Phieu_Kham_Benh.findByIdAndUpdate(
            id, 
            { $set: { TrangThaiThanhToan: true, STTKham: nextSTT } },
            { new: true }
          ).populate([
            {path:"Id_TheKhamBenh",
                select:"HoVaTen"
            },
            {path:"Id_Bacsi",
                populate: "Id_PhongKham"
            }
          ]);
          Callback(null, data);


        } catch (error) {
          Callback(error);
        }
    };


    Check_Benhnhan__M = async ( page,limit,Id_Bacsi , Ngay , TrangThai , TrangThaiHoatDong, Callback) => {
        try {
            const query = {
                Id_Bacsi : Id_Bacsi,
                Ngay : Ngay,
                TrangThai: TrangThai,
                TrangThaiThanhToan: true,
            }
            
            if (TrangThaiHoatDong !== null && TrangThaiHoatDong !== undefined) {
                query.TrangThaiHoatDong = TrangThaiHoatDong;
            }
            await connectDB();
            const skip = (page - 1)* limit;
            const Check_Donthuoc = await Phieu_Kham_Benh.find(query).populate({
                path:"Id_TheKhamBenh"
            }).sort({ STTKham: 1 }).skip(skip).limit(limit);
            const total = await Phieu_Kham_Benh.countDocuments(query)
            Callback(null, {totalItems:total, currentPage: page, totalPages: Math.ceil(total/limit),data:Check_Donthuoc});
        } catch (error){
            Callback(error);
        }
    }

TimKiemBenhNhanBangTenHoacSDT__M = async (
  page,
  limit,
  ngay,
  trangThai,
  trangThaiHoatDong,
  trangThaiThanhToan,
  soDienThoai,
  hoVaTen,
  idBacSi,
  callback
) => {
  try {
    await connectDB();

    const query = { Ngay: ngay };

    if (trangThai !== null && trangThai !== undefined) {
      query.TrangThai = trangThai;
    }

    if (trangThaiThanhToan !== null && trangThaiThanhToan !== undefined) {
      query.TrangThaiThanhToan = trangThaiThanhToan;
    }

    if (trangThaiHoatDong !== null && trangThaiHoatDong !== undefined) {
      query.TrangThaiHoatDong = trangThaiHoatDong;
    }

    if (idBacSi !== null && idBacSi !== undefined) {
      query.Id_Bacsi = idBacSi;
    }

    const skip = (page - 1) * limit;

    let danhSachPhieuKham = await Phieu_Kham_Benh.find(query)
      .populate({ path: "Id_TheKhamBenh" }) // chứa HoVaTen, SoDienThoai
      .sort({ STTKham: 1 })
      .lean();

    // Lọc theo hoVaTen và soDienThoai
    if (soDienThoai || hoVaTen) {
      danhSachPhieuKham = danhSachPhieuKham.filter((item) => {
        const thongTin = item.Id_TheKhamBenh || {};
        const matchTen =
          hoVaTen && thongTin.HoVaTen
            ? thongTin.HoVaTen.toLowerCase().includes(hoVaTen.toLowerCase())
            : true;
        const matchSDT =
          soDienThoai && thongTin.SoDienThoai
            ? thongTin.SoDienThoai.includes(soDienThoai)
            : true;
        return matchTen && matchSDT;
      });
    }

    const total = danhSachPhieuKham.length;
    const paginatedData = danhSachPhieuKham.slice(skip, skip + limit);

    callback(null, {
      totalItems: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      data: paginatedData,
    });
  } catch (error) {
    callback(error);
  }
};





Add_Phieukhambenh_M = async (Data, Callback) => {
    try {
        await connectDB();

        // Tạo đối tượng mới
        const Add_New = new Phieu_Kham_Benh(Data);

        // Lưu lại
        const savedDoc = await Add_New.save();

        // Populate thông tin liên kết
        const Result = await Phieu_Kham_Benh.findById(savedDoc._id).populate(
            [ 
                {
                path: 'Id_TheKhamBenh'
                },
                {
                    path:'Id_Bacsi',
                    populate:{
                        path:'Id_PhongKham'
                    }
                },
                {

                    path:'Id_GiaDichVu'

                }
            ]
           );

        Callback(null, Result);
    } catch (error) {
        Callback(error);
    }
};



    Edit_Phieukhambenh_M = async (id , Data , Callback) => {
        try {
            await connectDB();
            const Result = await Phieu_Kham_Benh.findByIdAndUpdate (id , Data ,  { new: true });
            Callback (null , Result);
        } catch (error) {
            Callback(error);
        }
    }


    BoQuaPhieuKham__M = async (id, Status, Callback) => {
        try {
            await connectDB();
            const Result = await Phieu_Kham_Benh.findByIdAndUpdate(
                id,
                { TrangThaiHoatDong: Status },
                { new: true, runValidators: true } 
            );
            Callback(null, Result);
        } catch (error) {
            Callback(error);
        }
    };


         

    Delete_Phieukhambenh_M =  async (id , Callback) => {
        try {
            await connectDB();
            const Result = await Phieu_Kham_Benh.findByIdAndDelete (id);
            Callback (null , Result);
        } catch (error) {
            Callback(error);
        }
    }

    GetNextSTT_M = async (ngay, Id_BacSi, Callback) => {
        try {
            await connectDB();
            // Tìm phiếu khám bệnh có cùng ngày và ca khám
            const phieuKham = await Phieu_Kham_Benh.find({
                Ngay: ngay,
                Id_Bacsi: Id_BacSi,
                TrangThaiThanhToan: 'true'
            }).sort({ STTKham: -1 }).limit(1);

            // Nếu không có phiếu nào, bắt đầu từ 1
            if (phieuKham.length === 0) {
                Callback(null, 1);
            } else {
                // Tăng số thứ tự lên 1
                const nextSTT = (phieuKham[0].STTKham + 1);
                Callback(null, nextSTT);
            }
        } catch (error) {
            Callback(error);
        }
    }

    // lấy những yêu cầu xét nghiệm chưa thanh toán để load cho thu ngân xem
    Get_Not_yet_paid = async (page, limit, Ngay, TrangThaiThanhToan,Callback)=>{
        try{
            const skip = (page - 1)* limit;
            await connectDB();
            const result = await Phieu_Kham_Benh.find({
                TrangThaiThanhToan:TrangThaiThanhToan,
                Ngay:Ngay
            }).populate({
                path: 'Id_TheKhamBenh',
                select: 'HoVaTen SoDienThoai',
            }).populate({
                path: 'Id_CaKham',
                select: 'TenCa',
                populate:[
                    {
                    path: 'Id_BacSi',
                    select: 'TenBacSi'
                        },
                    {
                    path: 'Id_PhongKham',
                    select: 'SoPhongKham'
                        },
                ] 
            }).skip(skip).limit(limit);
            const total = await Phieu_Kham_Benh.countDocuments({
                TrangThaiThanhToan:TrangThaiThanhToan,
                Ngay:Ngay
            })

            Callback(null, {totalItems:total, currentPage: page, totalPages: Math.ceil(total/limit),data:result})
        }catch(error){
            Callback(error)
        }
    } 
    

    Upload_Status_handling__M = async (_id  , Callback) => {
        try {
            await connectDB();
            const now = new Date();
            const formattedTime = now.toLocaleTimeString('vi-VN'); // Kết quả: "14:25:30"
            const data = await Phieu_Kham_Benh.findByIdAndUpdate(_id,{ $set: { TrangThai: true, GioKetThucKham: formattedTime}},{ new: true });
          Callback(null, data);
        } catch (error){
            Callback(error)
        }
    }
    
    Filter_PhieuKhamBenh_ByDate_M = async (limit, page,all, { fromDate, toDate, year }) => {
  try {
    await connectDB();
    const skip = (page - 1) * limit;

    let query = {}
    if(all == false || all == 'false'){
      query.TrangThaiThanhToan=true
    } // tùy chỉnh theo điều kiện lọc

    // Nếu lọc theo khoảng ngày
    if (fromDate && toDate) {
      query.Ngay = {
        $gte: fromDate,
        $lte: toDate,
      };
    }

    // Nếu lọc theo năm
    else if (year) {
      query.Ngay = {
        $regex: `^${year}`, // ví dụ: "2025" sẽ match "2025-01-01" đến "2025-12-31"
      };
    }

    const result = await Phieu_Kham_Benh.find(query).populate({
        path:'Id_GiaDichVu'
    }).skip(skip).limit(limit).lean();
    const total = await Phieu_Kham_Benh.countDocuments(query);

    return {
      totalItems: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

}

module.exports = Database_Phieu_Kham_Benh;
