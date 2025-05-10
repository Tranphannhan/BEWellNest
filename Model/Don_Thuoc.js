const connectDB = require("../Model/Db");
const Donthuoc = require("../Schema/Don_Thuoc"); 

class Database_Donthuoc {
    Select_Donthuoc_M = async (Callback) => {
      try {
        await connectDB();
        const Select_Donthuoc = await Donthuoc.find({});
        Callback(null, Select_Donthuoc);
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
   Upload_Status_handling__M = async (ID  , Callback) => {
    try {
      await connectDB();
      const data = await Donthuoc.findByIdAndUpdate(ID,{ $set: { TrangThai: true}},{ new: true });
      Callback(null, data);
    } catch (error){
      Callback(error)
    }
  }



}

module.exports = Database_Donthuoc;
