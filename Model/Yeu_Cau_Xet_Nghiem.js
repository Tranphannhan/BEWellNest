
const { path } = require("../app");
const connectDB = require("../Model/Db");
const Yeucauxetnghiem = require("../Schema/Yeu_Cau_Xet_Nghiem"); 

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
                    path: 'Id_PhongThietBi',
                    select: 'TenXetNghiem TenPhongThietBi'
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
                    path: 'Id_PhongThietBi',
                    select: 'TenXetNghiem TenPhongThietBi'
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
            const Data_YeuCauXetNghiem = await Yeucauxetnghiem.find({_id : Id_YeuCauXetNghiem})
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
            path:"Id_PhongThietBi"
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
    


    Delete_Yeucauxetnghiem_M =  async (id , Callback) => {
        try {
            await connectDB();
            const Result = await Yeucauxetnghiem.findByIdAndDelete (id);
            Callback (null , Result);
        } catch (error) {
            Callback(error);
        }
    }


    GetNextSTT_M = async (ngay, Id_PhongThietBi, Callback) => {
        try {
            await connectDB();
            const Yeu_Cau_Xet_Nghiem = await Yeucauxetnghiem.find({
                Ngay: ngay,
                Id_PhongThietBi: Id_PhongThietBi,
                TrangThaiThanhToan: 'true'
            }).sort({ STT: -1 }).limit(1);

            // Nếu không có phiếu nào, bắt đầu từ 1
            if (Yeu_Cau_Xet_Nghiem.length === 0) {
                Callback(null, "1");
            } else {
                // Tăng số thứ tự lên 1
                const nextSTT = (parseInt(Yeu_Cau_Xet_Nghiem[0].STT) + 1).toString();
                Callback(null, nextSTT);
            }
            
        } catch (error) {
            Callback(error);
        }
    }


    // Dùng để load dữ liệu cho mỗi phòng thiết bị khi đã thanh toán và có số thứ tự rồi mới load, đã sắp xếp
    Get_By_PTB_Date_M = async (Id_PhongThietBi, ngay, Callback) => {
        try {
            await connectDB();
            const result = await Yeucauxetnghiem.find({
                Id_PhongThietBi: Id_PhongThietBi,
                Ngay: ngay,
                TrangThai: false,
                TrangThaiThanhToan:true
            }).sort({ STT: 1 });
            Callback(null, result);
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




    // lấy những yêu cầu xét nghiệm chưa thanh toán để load cho thu ngân xem
    Get_Not_yet_paid = async (Callback) => {
    try {
        await connectDB();
const result = await Yeucauxetnghiem.find({
  TrangThaiThanhToan: false
}).populate([
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
    path: 'Id_PhongThietBi',
    select: 'TenXetNghiem TenPhongThietBi'
  }
]);



        Callback(null, result);
    } catch (error) {
        Callback(error);
    }
};

}

module.exports = Database_Yeu_Cau_Xet_Nghiem;
