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

  
  Add_Ketquaxetnghiem = (req, res, next) => {
  try {
    // Ngày Việt Nam dạng YYYY-MM-DD
    const ngay = new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Ho_Chi_Minh" });
    // Giờ Việt Nam dạng HH:mm:ss
    const formattedTime = new Date().toLocaleTimeString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });

    // Lấy ảnh, nếu không có thì dùng ảnh mặc định
    const Image = req.file ? req.file.filename : "AnhMacDinhKetQuaXetNghiem.png";

    // Lấy dữ liệu từ request body
    const {
      Id_YeuCauXetNghiem,
      Id_PhieuKhamBenh,
      Id_NguoiXetNghiem,
      MaXetNghiem,
      TenXetNghiem,
      LoaiKetQua,
      KetQua,
      DonViTinh,
      ChiSoBinhThuong,
      GhiChu,
      LoaiChup,
      VungChup,
      NguonThamChieu,
      GioiHanCanhBao,
    } = req.body;

    // Kiểm tra bắt buộc
    if (!Id_YeuCauXetNghiem || !Id_PhieuKhamBenh || !Id_NguoiXetNghiem) {
      return res.status(400).json({ message: "Thiếu dữ liệu bắt buộc" });
    }

    const Data_Add = {
      Id_YeuCauXetNghiem: Id_YeuCauXetNghiem.trim(),
      Id_PhieuKhamBenh: Id_PhieuKhamBenh.trim(),
      Id_NguoiXetNghiem: Id_NguoiXetNghiem.trim(),
      MaXetNghiem: MaXetNghiem?.trim() || "",
      TenXetNghiem: TenXetNghiem?.trim() || "",
      LoaiKetQua: LoaiKetQua || "",
      KetQua: KetQua?.trim() || "",
      DonViTinh: DonViTinh?.trim() || "",
      ChiSoBinhThuong: ChiSoBinhThuong?.trim() || "",
      GhiChu: GhiChu?.trim() || "",
      NgayXetNghiem: ngay,
      Gio: formattedTime,
      Image: Image,
      LoaiChup: LoaiChup?.trim() || "",
      VungChup: VungChup?.trim() || "",
      NguonThamChieu: NguonThamChieu?.trim() || "",
      GioiHanCanhBao: GioiHanCanhBao?.trim() || "",
    };

    // Gọi model thêm dữ liệu
    Connect_Data_Model.Add_Ketquaxetnghiem_M(Data_Add, (Error, Result) => {
      if (Error) return next(Error);
      res.status(200).json({ message: "Thêm mới kết quả xét nghiệm thành công", data: Result });
    });
  } catch (err) {
    next(err);
  }
};



   
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

  
  GETIdPhieuKhamBenh =  (req , res , next) => {
    const Id_PhieuKhamBenh  =  req.params.ID;
    Connect_Data_Model.GETIdPhieuKhamBenh__M (Id_PhieuKhamBenh , (error , result) => {
      if (error) return next(error);
      res.status(200).json(result);
    });
  }         

  
   
  Edit_Ketquaxetnghiem = (req, res, next) => {
    const { ID } = req.params;
    if (!ID) return res.status(400).json({ message: "Edit Thất Bại" });
    const Check_Image = req.file ? req.file.filename : false;
    const Data_Edit = {
      KetQua: req.body.KetQua.trim(),
      Image: `http://localhost:5000/image/${Check_Image}`,
    };

    if (!Check_Image) delete Data_Edit.Image;
    Connect_Data_Model.Edit_Ketquaxetnghiem_M(ID, Data_Edit, (Error, Result) => {
      if (Error) return next(Error);
      res.status(200).json({
        message: "Cập Nhật Kết Quả Yêu Cầu Xét Nghiệm Thành Công",
        data: Result,
      });
    });
  };



  
  Delete_Ketquaxetnghiem = (req, res, next) => {
    const { ID } = req.params;
    if (!ID) return res.status(400).json({ message: "Thiếu ID để xóa Kết Quả Xét Nghiệm" });
    Connect_Data_Model.Delete_Ketquaxetnghiem_M(ID, (Error, Result) => {
      if (Error) return next(Error);
      if (!Result) return res.status(404).json({ message: "Không tìm thấy Kết Quả Xét Nghiệm để xóa" }); 
      res.status(200).json({ message: "Xóa Kết Quả Yêu Cầu Xét Nghiệm Thành Công", data: Result });
    });
  };
}

module.exports = Ketquaxetnghiem_Controler;
