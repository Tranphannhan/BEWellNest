
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


    Add_Thekhambenh_M = async (Data , Callback) => {
        try {
            await connectDB();
            const Add_New = new The_Kham_Benh (Data);
            const Result = await Add_New.save();
            Callback (null , Result);
        }

        catch (error) {
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
