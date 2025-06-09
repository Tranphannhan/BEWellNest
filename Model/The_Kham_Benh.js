
const connectDB = require("../Model/Db");
const The_Kham_Benh = require("../Schema/The_Kham_Benh"); 

class Database_The_Kham_Benh {
    Select_The_khambenh_M = async (page,limit,Callback) => {
        try {
            const skip = (page - 1)* limit;
            await connectDB();
            const data = await The_Kham_Benh.find({}).skip(skip).limit(limit);
            const total = await The_Kham_Benh.countDocuments()
            Callback(null,  {totalItems:total, currentPage: page, totalPages: Math.ceil(total/limit),data:data});
        } 
        
        catch (error) {
            Callback(error);
        }   
    };

TimKiemSoKhamBenh_M = async (page, limit, SoCCCD, SoDienThoai, HoVaTen, Callback) => {
    try {
        const query = {};

        if (SoCCCD) {
            query.SoCCCD = SoCCCD;
        }

        if (SoDienThoai) {
            query.SoDienThoai = SoDienThoai;
        }

        if (HoVaTen) {
            query.HoVaTen = { $regex: new RegExp(HoVaTen, 'i') };
        }

        const skip = (page - 1) * limit;

        await connectDB();

        const data = await The_Kham_Benh.find(query).skip(skip).limit(limit);
        const total = await The_Kham_Benh.countDocuments(query);

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



    Detail__M = async (_id , Callback) => {
        try {
            await connectDB ();
            const Select_Detail = await The_Kham_Benh.find ({_id});
            Callback(null, Select_Detail);
        } catch (error) {
            Callback(error);
        }   
    }


Add_Thekhambenh_M = async (Data, Callback) => {
    try {
        await connectDB();

        // Kiểm tra nếu có số CCCD trùng
        if (Data.SoCCCD) {
            const existingCCCD = await The_Kham_Benh.findOne({ SoCCCD: Data.SoCCCD });
            if (existingCCCD) {
                return Callback(null, { message: "Số CCCD đã tồn tại", status: 400 });
            }
        }

        // Kiểm tra trùng theo Họ và Tên + Ngày sinh + Giới tính
        const existingPatient = await The_Kham_Benh.findOne({
            HoVaTen: Data.HoVaTen,
            NgaySinh: Data.NgaySinh,
            GioiTinh: Data.GioiTinh,
        });

        if (existingPatient) {
            return Callback(null,{
                message: "Bệnh nhân này đã tạo sổ khám bệnh tạm thời rồi",
                status: 400,
                data: existingPatient, // Trả lại dữ liệu đã có
            });
        }

        // Nếu không trùng, tiến hành tạo mới
        const Add_New = new The_Kham_Benh(Data);
        const Result = await Add_New.save();
        Callback(null, {message:'thêm mới thành công', data:Result});
    } catch (error) {
        Callback(error);
    }
}



    Edit_Thekhambenh_M = async (id , Data , Callback) => {
        try {
            await connectDB();
            const Result = await The_Kham_Benh.findByIdAndUpdate (id , Data ,  { new: true });
            Callback (null , Result);
        }

        catch (error) {
            Callback(error);
        }
    }


    Delete_Thekhambenh_M =  async (id , Callback) => {
        try {
            await connectDB();
            const Result = await The_Kham_Benh.findByIdAndDelete (id);
            Callback (null , Result);
        }

        catch (error) {
            Callback(error);
        }
    }
}

module.exports = Database_The_Kham_Benh;
