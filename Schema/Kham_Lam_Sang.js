const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;


const Kham_Lam_Sang_Schema = new mongoose.Schema({
    Id_PhieuKhamBenh : ObjectId,
    TrieuChung : String,
    KetQua : String
    
}, { collection: "Kham_Lam_Sang" }); 
module.exports = mongoose.model("Kham_Lam_Sang", Kham_Lam_Sang_Schema);  
   