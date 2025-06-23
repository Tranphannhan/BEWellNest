
const connectDB = require("../Model/Db");
const Yeucauxetnghiem = require("../Schema/Yeu_Cau_Xet_Nghiem"); 
const Loaixetnghiem = require("../Schema/Loai_Xet_Nghiem"); 
const Phieu_Kham_Benh = require("../Schema/Phieu_Kham_Benh"); 

class Database_Yeu_Cau_Xet_Nghiem {
    Select_Yeucauxetnghiem_M = async (Callback) => {
        try {
            await connectDB();
            const Select_Yeucauxetnghiem = await Yeucauxetnghiem.find({});
            Callback(null, Select_Yeucauxetnghiem);
        } catch (error) {
            Callback(error);
        }   
    };    
  
    Detail__M = async (_id , Callback) => {
        try {
            await connectDB ();
            const Select_Detail = await Yeucauxetnghiem.find ({_id}).populate([
                {
                    path: 'Id_PhieuKhamBenh',
                    select: 'Ngay',
                    populate: [
                    {
                        path: 'Id_TheKhamBenh',
                        select: 'HoVaTen SoDienThoai GioiTinh'
                    },
                    {
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
                    }
                    ]
                },
                {
                    path: 'Id_LoaiXetNghiem',
                    select: 'TenXetNghiem',
                    populate:{
                        path:'Id_PhongThietBi',
                        select:"TenPhongThietBi"
                    }
                }
                ])
            
            
            ;
            Callback(null, Select_Detail);
        } catch (error) {
            Callback(error);
        }   
    }
   
  
   
    GET_LayTheoPhieuKhamBenh__M = async (Id_PhieuKhamBenh , Callback) => {
        try {
            await connectDB ();
            const Select_Detail = await Yeucauxetnghiem.find ({Id_PhieuKhamBenh}).populate([
                {path:"Id_LoaiXetNghiem",
                    select:"TenXetNghiem Image",
                    populate:[
                        {path:"Id_GiaDichVu",
                            select:"Giadichvu"
                        },
                        {
                            path:"Id_PhongThietBi",
                            select:"TenPhongThietBi"
                        }
                    ]
                }
                ])
            
            
            ;
            Callback(null, Select_Detail);
        } catch (error) {
            Callback(error);
        }   
    }





    Select_Check_Status_Yeucauxetnghiem_M = async (Id_YeuCauXetNghiem , Callback) => {
        try {
            await connectDB();
            const Data_YeuCauXetNghiem = await Yeucauxetnghiem.find({_id : Id_YeuCauXetNghiem}).populate({
                path:'Id_LoaiXetNghiem'
            })
            Callback(null, Data_YeuCauXetNghiem);
        } catch (error){
            Callback(error);
        }
    } 

    PaymentConfirmation_M = async (id, nextSTT, Callback) => {
        try {
          await connectDB();
          const Data_YeuCauXetNghiem = await Yeucauxetnghiem.findByIdAndUpdate(
            id, // ✅ truyền trực tiếp id
            { $set: { TrangThaiThanhToan: true, STT: nextSTT } },
            { new: true }
          ).populate([
                {
            path:"Id_LoaiXetNghiem"
            },
            {path:"Id_PhieuKhamBenh",
                select:'TrangThaiThanhToan',
                populate:{
                    path:"Id_TheKhamBenh",
                    select:"HoVaTen"
                }
            }
          ]);
          Callback(null, Data_YeuCauXetNghiem);
        } catch (error) {
          Callback(error); 
        }
      };
      


    Add_Yeucauxetnghiem_M = async (Data , Callback) => {
        try {
            await connectDB();
            const Add_New = new Yeucauxetnghiem (Data);
            const Result = await Add_New.save();
            Callback (null , Result);
        } catch (error) {
            Callback(error);
        }
    }
    

    Boquatrangthaihoatdong__M = async (_id, Callback) => {
        try {
            await connectDB();    
            const Result = await Yeucauxetnghiem.findByIdAndUpdate( _id, {TrangThaiHoatDong : true}, { new: true });
            Callback(null, Result);
        } catch (error) {
            Callback(error);
        }
    };




    Edit_Yeucauxetnghiem_M = async (_id, Data_Edit, Callback) => {
        try {
            await connectDB();    
            const oldRecord = await Yeucauxetnghiem.findOne({ _id: _id }).select('Anh_Xet_Nghiem');
            if (Data_Edit.Anh_Xet_Nghiem === oldRecord?.Anh_Xet_Nghiem) {
                delete Data_Edit.Anh_Xet_Nghiem;
            }
    
            const Result = await Yeucauxetnghiem.findByIdAndUpdate( _id, Data_Edit, { new: true });
            Callback(null, Result);
        } catch (error) {
            Callback(error);
        }
    };

   
Delete_Yeucauxetnghiem_M = async (id, Callback) => {
    try {
        await connectDB();
        
        // Tìm trước xem yêu cầu có tồn tại và chưa thanh toán không
        const record = await Yeucauxetnghiem.findById(id);

        if (!record) {
            return Callback(new Error("Không tìm thấy yêu cầu xét nghiệm"));
        }

        if (record.TrangThaiThanhToan) {
            return Callback(new Error("Không thể xóa vì yêu cầu đã được thanh toán"));
        }

        // Nếu chưa thanh toán thì xóa
        const Result = await Yeucauxetnghiem.findByIdAndDelete(id);
        Callback(null, Result);
        
    } catch (error) {
        Callback(error);
    }
}



GetNextSTT_M = async (ngay, Id_PhongThietBi, Callback) => {
    try {
        await connectDB();

        // Bước 1: Lấy danh sách Id_LoaiXetNghiem theo Id_PhongThietBi
        const dsLoaiXetNghiem = await Loaixetnghiem.find({ Id_PhongThietBi: Id_PhongThietBi }).select('_id');
        const danhSachIdLoai = dsLoaiXetNghiem.map(item => item._id);

        // Bước 2: Tìm yêu cầu xét nghiệm theo ngày và danh sách Id_LoaiXetNghiem đó
        const Yeu_Cau_Xet_Nghiem = await Yeucauxetnghiem.find({
            Ngay: ngay,
            Id_LoaiXetNghiem: { $in: danhSachIdLoai },
            TrangThaiThanhToan: true,
            TrangThaiHoatDong: true
        }).sort({ STT: -1 }).limit(1);

        // Bước 3: Trả về STT
        if (Yeu_Cau_Xet_Nghiem.length === 0) {
            Callback(null, "1");
        } else {
            const nextSTT = (parseInt(Yeu_Cau_Xet_Nghiem[0].STT) + 1).toString();
            Callback(null, nextSTT);
        }

    } catch (error) {
        Callback(error);
    }
}


    // Dùng để load dữ liệu cho mỗi phòng thiết bị khi đã thanh toán và có số thứ tự rồi mới load, đã sắp xếp
    Get_By_PTB_Date_M = async (page,limit,TrangThai,Id_PhongThietBi, ngay, Callback) => {
        try {
            await connectDB();
            const dsLoaiXetNghiem = await Loaixetnghiem.find({ Id_PhongThietBi: Id_PhongThietBi }).select('_id');
            const danhSachIdLoai = dsLoaiXetNghiem.map(item => item._id);
            const skip = (page - 1)* limit;
            const result = await Yeucauxetnghiem.find({
                Id_LoaiXetNghiem: { $in: danhSachIdLoai },
                Ngay: ngay,
                TrangThai: TrangThai,
                TrangThaiThanhToan:true
            }).sort({ STT: 1 }).populate([
  {
    path: 'Id_PhieuKhamBenh',
    select: 'Ngay',
    populate: [
      {
        path: 'Id_TheKhamBenh',
        select: 'HoVaTen SoDienThoai'
      },
      {
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
      }
    ]
  }
]).skip(skip).limit(limit);

            const total = await Yeucauxetnghiem.countDocuments({
                Id_PhongThietBi: Id_PhongThietBi,
                Ngay: ngay,
                TrangThai: TrangThai,
                TrangThaiThanhToan:true
            })
            Callback(null, {totalItems:total, currentPage: page, totalPages: Math.ceil(total/limit),data:result});
        } catch (error) {
            Callback(error);
        }
    };


    
    Upload_Status_handling__M = async (ID  , Callback) => {
        try {
            await connectDB();
            const data = await Yeucauxetnghiem.findByIdAndUpdate(ID,{ $set: { TrangThai: true}},{ new: true });
          Callback(null, data);
        } catch (error){
            Callback(error)
        }
    }


TimKiemBenhNhanBangSDTHoacIdTheKhamBenh__M = async (
    page, limit, id_PhongThietBi, Ngay,
    TrangThai, TrangThaiHoatDong, TrangThaiThanhToan,
    SDT, Id_TheKhamBenh, Callback
) => {
    try {
        await connectDB();

        const query = {};
        if (Ngay) query.Ngay = Ngay;
        if (TrangThai !== null && TrangThai !== undefined) query.TrangThai = TrangThai;
        if (TrangThaiHoatDong !== null && TrangThaiHoatDong !== undefined) query.TrangThaiHoatDong = TrangThaiHoatDong;
        if (TrangThaiThanhToan !== null && TrangThaiThanhToan !== undefined) query.TrangThaiThanhToan = TrangThaiThanhToan;

        const search = {};

        if (Id_TheKhamBenh) {
            search.Id_TheKhamBenh = Id_TheKhamBenh;
        }
        if(Ngay) search.Ngay = Ngay;

        // 1. Lấy toàn bộ danh sách phiếu khám bệnh (không skip/limit ở đây)
        let KetQuaTimTheoId_TheKhamBenh = await Phieu_Kham_Benh.find(search)
            .populate({ path: "Id_TheKhamBenh" })
            .sort({ STTKham: 1 })
            .lean();

        // 2. Nếu có SDT thì lọc thêm theo số điện thoại
        if (SDT) {
            KetQuaTimTheoId_TheKhamBenh = KetQuaTimTheoId_TheKhamBenh.filter(
                item => item.Id_TheKhamBenh?.SoDienThoai === SDT
            );
        }

        // 3. Lấy danh sách ID
        const danhSachIdLoai = KetQuaTimTheoId_TheKhamBenh.map(item => item._id);

        // 4. Lấy tất cả các yêu cầu xét nghiệm theo danh sách phiếu khám bệnh
        let dataQuery = { Id_PhieuKhamBenh: { $in: danhSachIdLoai }, ...query };

        const total = await Yeucauxetnghiem.countDocuments(dataQuery);
        const data = await Yeucauxetnghiem.find(dataQuery).populate([
            {
                path: 'Id_PhieuKhamBenh',
                select: 'Ngay',
                populate: [
                {
                    path: 'Id_TheKhamBenh',
                    select: 'HoVaTen SoDienThoai'
                },
                {
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
                }
                ]
            },
            {
                path: 'Id_LoaiXetNghiem',
                select: 'TenXetNghiem',
                populate:{
                    path:"Id_PhongThietBi",
                    select: 'TenPhongThietBi'
                }
            }
            ])
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();

        Callback(null, {
            totalItems: total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            data: data,
        });
    } catch (error) {
        Callback(error);
    }
};




    // lấy những yêu cầu xét nghiệm chưa thanh toán để load cho thu ngân xem
    Get_Not_yet_paid_Detail = async (page, limit, Ngay, TrangThaiThanhToan, Id_PhieuKhamBenh, Callback) => {
    try {
        await connectDB();
        const skip = (page - 1)*limit;
const result = await Yeucauxetnghiem.find({
            TrangThaiThanhToan: TrangThaiThanhToan,
            Ngay: Ngay,
            TrangThaiHoatDong:true,
            Id_PhieuKhamBenh:Id_PhieuKhamBenh
            }).populate([
            {
                path: 'Id_PhieuKhamBenh',
                select: 'Ngay',
                populate: [
                {
                    path: 'Id_TheKhamBenh'
                },
                {
                    path: 'Id_Bacsi',
                    select: 'TenBacSi'
                }
                ]
            },
            {
                path: 'Id_LoaiXetNghiem',
                select: 'TenXetNghiem',
                populate:[
                    {
                    path:"Id_PhongThietBi",
                    select: 'TenPhongThietBi'
                },
                {
                    path:'Id_GiaDichVu'
                }
                ]
            }
            ]).skip(skip).limit(limit).sort({ createdAt: 1 });

    const total = await Yeucauxetnghiem.countDocuments({ 
        TrangThaiThanhToan: TrangThaiThanhToan,
        Ngay: Ngay,
        TrangThaiHoatDong:true,
        Id_PhieuKhamBenh:Id_PhieuKhamBenh
    })

        Callback(null, {totalItems:total, currentPage: page, totalPages: Math.ceil(total/limit),data:result});
    } catch (error) {
        Callback(error);
    }
};

Get_Not_yet_paid = async (page, limit, Ngay, TrangThaiThanhToan, Callback) => {
    try {
        await connectDB();

        const skip = (page - 1) * limit;

        // Lấy tất cả yêu cầu xét nghiệm chưa thanh toán
        const allResults = await Yeucauxetnghiem.find({
            TrangThaiThanhToan: TrangThaiThanhToan,
            Ngay: Ngay,
            TrangThaiHoatDong: true
        })
        .populate([
            {
                path: 'Id_PhieuKhamBenh',
                select: 'Ngay',
                populate: [
                    {
                        path: 'Id_TheKhamBenh'
                    }
                ]
            },
            {
                path: 'Id_LoaiXetNghiem',
                select: 'TenXetNghiem',
                populate: {
                    path: 'Id_GiaDichVu',
                    select: 'Giadichvu'
                }
            }
        ])
        .sort({ createdAt: 1 });

        // Gom nhóm theo Id_PhieuKhamBenh và tính tổng tiền
        const grouped = new Map();

        for (const item of allResults) {
            const phieuId = item?.Id_PhieuKhamBenh?._id?.toString();
            const gia = item?.Id_LoaiXetNghiem?.Id_GiaDichVu?.Giadichvu || 0;

            if (!phieuId) continue;

            if (!grouped.has(phieuId)) {
                grouped.set(phieuId, {
                    TongTien: gia,
                    firstItem: item.toObject()
                });
            } else {
                const current = grouped.get(phieuId);
                current.TongTien += gia;
            }
        }

        // Tạo mảng kết quả từ Map đã nhóm
        const filteredResults = [];
        for (const [_, value] of grouped.entries()) {
            filteredResults.push({
                ...value.firstItem,
                TongTien: value.TongTien
            });
        }

        // Phân trang thủ công
        const total = filteredResults.length;
        const paginated = filteredResults.slice(skip, skip + limit);

        Callback(null, {
            totalItems: total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            data: paginated
        });

    } catch (error) {
        Callback(error);
    }
};



Filter_Yeucauxetnghiem_ByDate_M = async (limit, page, { fromDate, toDate, year }) => {
  try {
    await connectDB();
    const skip = (page - 1) * limit;
    let query = { TrangThaiThanhToan: true };

    if (fromDate && toDate) {
      const start = new Date(fromDate);
      const end = new Date(toDate);
      end.setHours(23, 59, 59, 999);

      query.createdAt = { $gte: start, $lte: end };
    } else if (year) {
      const start = new Date(`${year}-01-01T00:00:00.000Z`);
      const end = new Date(`${year}-12-31T23:59:59.999Z`);

      query.createdAt = { $gte: start, $lte: end };
    }

    const result = await Yeucauxetnghiem.find(query).populate({
        path:'Id_LoaiXetNghiem',
        populate:{
            path:'Id_GiaDichVu'
        }
    }).skip(skip).limit(limit);
    const total = await Yeucauxetnghiem.countDocuments(query);

    return {
      totalItems: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      data: result
    };
  } catch (error) {
    throw error;
  }
};



}

module.exports = Database_Yeu_Cau_Xet_Nghiem;
