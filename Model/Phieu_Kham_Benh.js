const { path } = require("../app");
const connectDB = require("../Model/Db");
const Phieu_Kham_Benh = require("../Schema/Phieu_Kham_Benh"); 

class Database_Phieu_Kham_Benh {
    Select_Phieukhambenh_M = async (Callback) => {
        try {
            await connectDB();
            const Select_Phieukhambenh = await Phieu_Kham_Benh.find({});
            Callback(null, Select_Phieukhambenh);
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
            {path:"Id_CaKham",
                select:"TenCa",
                populate:[
                    {
                          path:"Id_PhongKham"
                
                    },
                    {
                         path:"Id_BacSi",
                         select:"TenBacSi"
                    }
                ]
                  
            }
          ]);
          Callback(null, data);


        } catch (error) {
          Callback(error);
        }
    };


    Check_Benhnhan__M = async ( page,limit,Id_CaKham , Ngay , TrangThai , Callback) => {
        try {
            await connectDB();
            const skip = (page - 1)* limit;
            const Check_Donthuoc = await Phieu_Kham_Benh.find({
                Id_CaKham : Id_CaKham ,
                Ngay : Ngay,
                TrangThai: TrangThai,
                TrangThaiThanhToan: true
            }).populate({
                path:"Id_TheKhamBenh"
            }).sort({ STTKham: 1 }).skip(skip).limit(limit);
            const total = await Phieu_Kham_Benh.countDocuments({
                Id_CaKham : Id_CaKham ,
                Ngay : Ngay,
                TrangThai: TrangThai,
                TrangThaiThanhToan: true
            })
            Callback(null, {totalItems:total, currentPage: page, totalPages: Math.ceil(total/limit),data:Check_Donthuoc});
        } catch (error){
            Callback(error);
        }
    }



    Add_Phieukhambenh_M = async (Data , Callback) => {
        try {
            await connectDB();
            const Add_New = new Phieu_Kham_Benh (Data);
            const Result = await Add_New.save();
            Callback (null , Result);
        } catch (error) {
            Callback(error);
        }
    }


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

    GetNextSTT_M = async (ngay, idCaKham, Callback) => {
        try {
            await connectDB();
            // Tìm phiếu khám bệnh có cùng ngày và ca khám
            const phieuKham = await Phieu_Kham_Benh.find({
                Ngay: ngay,
                Id_CaKham: idCaKham,
                TrangThaiThanhToan: 'true'
            }).sort({ STTKham: -1 }).limit(1);

            // Nếu không có phiếu nào, bắt đầu từ 1
            if (phieuKham.length === 0) {
                Callback(null, "1");
            } else {
                // Tăng số thứ tự lên 1
                const nextSTT = (parseInt(phieuKham[0].STTKham) + 1).toString();
                Callback(null, nextSTT);
            }
        } catch (error) {
            Callback(error);
        }
    }

    // lấy những yêu cầu xét nghiệm chưa thanh toán để load cho thu ngân xem
    Get_Not_yet_paid = async (Callback)=>{
        try{
            await connectDB();
            const result = await Phieu_Kham_Benh.find({
                TrangThaiThanhToan:false
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
            })

            Callback(null, result)
        }catch(error){
            Callback(error)
        }
    } 
    

    Upload_Status_handling__M = async (ID  , Callback) => {
        try {
            await connectDB();
            const data = await Phieu_Kham_Benh.findByIdAndUpdate(ID,{ $set: { TrangThai: true}},{ new: true });
          Callback(null, data);
        } catch (error){
            Callback(error)
        }
    }


}

module.exports = Database_Phieu_Kham_Benh;
