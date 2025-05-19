const Connect_Select_Ketquaxetnghiem = require("../Model/Ket_Qua_Xet_Nghiem");
const Connect_Data_Model = new Connect_Select_Ketquaxetnghiem();

class Ketquaxetnghiem_Controler {
  Runviews = (req, res, next) => res.status(200).json({ message: "Loadding Thành Công" }); // ✅ Chuẩn hóa phản hồi

  Select_Ketquaxetnghiem = (req, res, next) => {
    Connect_Data_Model.Select_Ketquaxetnghiem_M((error, result) => {
      if (error) return next(error);
      if (!result || result.length < 1) { // ✅ Kiểm tra dữ liệu rỗng
        return res.status(404).json({ message: "Dữ liệu Kết Quả Xét Nghiệm rỗng" }); // ✅ Chuẩn hóa response
      }
      res.status(200).json(result);
    });
  }; 

  
  Add_Ketquaxetnghiem = (req , res , next) => {
    const Get_Anh_Xet_Nghiem = req.file ? req.file.filename : 'null';
    const Data_Add = {
        Id_YeuCauXetNghiem : req.body.Id_YeuCauXetNghiem.trim(),
        Id_NguoiXetNghiem: req.body.Id_NguoiXetNghiem.trim(),
        KetQua : req.body.KetQua.trim(),
        Anh_Xet_Nghiem : `http://localhost:5000/image/${Get_Anh_Xet_Nghiem}` 
    }   

    if (!Data_Add) return res.send ("Không có dữ liệu");
    Connect_Data_Model.Add_Ketquaxetnghiem_M (Data_Add , (Error , Result) => {
        if (Error) return next(Error);
        res.send ("Thêm Mới Kết quả Xét Nghiệm Thành Công");
    });
  }  
   
  Detail_Xet_Nghiem = (req , res , next) => {
    const ID  =  req.params.ID;
    Connect_Data_Model.Detail__M (ID  , (error , result) => {
      if (error) return next(error);
      res.status(200).json(result);
    });
  }   

  GET_YeuCauXetNghiem = (req , res , next) => {
    const Id_YeuCauXetNghiem  =  req.params.ID;
    Connect_Data_Model.GET_YeuCauXetNghiem__M (Id_YeuCauXetNghiem , (error , result) => {
      if (error) return next(error);
      res.status(200).json(result);
    });
  }         

  

  Edit_Ketquaxetnghiem = (req , res, next ) => {
    const {ID} = req.params;
    const Get_Anh_Xet_Nghiem = req.file ? req.file.filename : 'null';
    const Data_Edit = {
        KetQua : req.body.KetQua.trim(),
        Anh_Xet_Nghiem : `http://localhost:5000/image/${Get_Anh_Xet_Nghiem}` 
    }

    Connect_Data_Model.Edit_Ketquaxetnghiem_M(ID, Data_Edit, (Error, Result) => {
      if (Error) return next(Error);
      res.status(200).json({ message: "Cập Nhật Kết Quả Yêu Cầu Xét Nghiệm Thành Công", data: Result }); // ✅ Chuẩn hóa response
    });
  };

  
  Delete_Ketquaxetnghiem = (req, res, next) => {
    const { ID } = req.params;
    if (!ID) return res.status(400).json({ message: "Thiếu ID để xóa Kết Quả Xét Nghiệm" }); // ✅ Kiểm tra ID

    Connect_Data_Model.Delete_Ketquaxetnghiem_M(ID, (Error, Result) => {
      if (Error) return next(Error);
      if (!Result) {
        return res.status(404).json({ message: "Không tìm thấy Kết Quả Xét Nghiệm để xóa" }); // ✅ Chuẩn hóa response
      }
      res.status(200).json({ message: "Xóa Kết Quả Yêu Cầu Xét Nghiệm Thành Công", data: Result }); // ✅ Chuẩn hóa response
    });
  };
}

module.exports = Ketquaxetnghiem_Controler;
