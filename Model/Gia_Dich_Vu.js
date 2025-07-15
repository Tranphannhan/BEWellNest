
const connectDB = require("../Model/Db");
const Hoadon = require("../Schema/Gia_Dich_Vu"); 

class Database_Dichvu {
  
    Select_Giadichvu__M = async (page, limit, Callback) => {
        const Loaigia = "GiaXetNghiem";
        try {
            const skip = (page - 1) * limit;
            await connectDB();
            const condition = { Loaigia }; 

            const Select_Giadichvu = await Hoadon.find(condition)
                .skip(skip).limit(limit);
            const total = await Hoadon.countDocuments(condition); 

            Callback(null, {
                totalItems: total,
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                data: Select_Giadichvu,
            });
        } catch (error) {
            Callback(error);
        }
    };

    GetDetail_Giadichvu__M = async (id, Callback) => {
        try {
            await connectDB();
            const result = await Hoadon.findById(id);
            Callback(null, result);
        } catch (error) {
            Callback(error);
        }
    }


    Select_GiaKham__M = async (page, limit, Callback) => {
        const Loaigia = "GiaKham";
        try {
            const skip = (page - 1) * limit;
            await connectDB();
            const condition = { Loaigia }; 

            const Select_Giadichvu = await Hoadon.find(condition)
                .skip(skip).limit(limit);
            const total = await Hoadon.countDocuments(condition); 

            Callback(null, {
                totalItems: total,
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                data: Select_Giadichvu,
            });
        } catch (error) {
            Callback(error);
        }
    };


        
   Search__M = async (page, limit, Tendichvu, Loaigia, Callback) => {
        try {
            const skip = (page - 1) * limit;
            await connectDB();

            const filter = {
                Tendichvu: { $regex: Tendichvu, $options: "i" },
                Loaigia: Loaigia,
            };

            const Select_Gia = await Hoadon.find(filter).skip(skip).limit(limit);
            const total = await Hoadon.countDocuments(filter);

            Callback(null, {
            totalItems: total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            data: Select_Gia,
            });
        } catch (error) {
            Callback(error);
        }
    };





    Add_Giadichvu__M = async (Data , Callback) => {
        try {
            await connectDB();
            const Add_New = new Hoadon (Data);
            const Result = await Add_New.save();
            Callback (null , Result);
        } catch (error) {
            Callback(error);
        }
    }
   
    SuaTrangThai__M = async (id , TrangThaiHoatDong , Callback) => {
        try {
            await connectDB();
            const Result = await Hoadon.findByIdAndUpdate (id ,{ TrangThaiHoatDong : TrangThaiHoatDong} ,  { new: true });
            Callback (null , Result);
        } catch (error) {
            Callback(error);
        }
    }


    Upload_Giadichvu__M = async (id , Data , Callback) => {
        try {
            await connectDB();
            const Result = await Hoadon.findByIdAndUpdate (id , Data ,  { new: true });
            Callback (null , Result);
        } catch (error) {
            Callback(error);
        }
    }

    
    Delete_Giadichvu__M =  async (id , Callback) => {
        try {
            await connectDB();
            const Result = await Hoadon.findByIdAndDelete (id);
            Callback (null , Result);
        } catch (error) {
            Callback(error);
        }
    }
}

module.exports = Database_Dichvu;
