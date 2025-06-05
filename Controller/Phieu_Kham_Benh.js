const Connect_Phieu_Kham_Benh = require("../Model/Phieu_Kham_Benh");
const Connect_Data_Model = new Connect_Phieu_Kham_Benh();


class Phieu_Kham_Benh {
  Runviews = (req, res, next) => res.status(200).json({ message: "Loadding Thành Công" }); // ✅ Đã sửa thành chuẩn response JSON

  Select_Phieukhambenh = (req, res, next) => {
    Connect_Data_Model.Select_Phieukhambenh_M((error, result) => {
      if (error) return next(error);
      if (!result || result.length < 1) { // ✅ Kiểm tra dữ liệu rỗng
        return res.status(404).json({ message: "Dữ liệu phiếu khám bệnh rỗng" }); // ✅ Đã sửa thành response JSON
      }
      res.status(200).json(result);
    });
  };


  Detail_Phieukham = (req , res , next) => {
    const ID  =  req.params.ID;
    Connect_Data_Model.Detail__M (ID  , (error , result) => {
      if (error) return next(error);
      res.status(200).json(result);
    });
  }   

  GET_LayTheoTheKhamBenh = (req , res , next) => {
    const ID  = req.params.ID;
    Connect_Data_Model.GET_LayTheoTheKhamBenh__M (ID  , (error , result) => {
      if (error) return next(error);
      res.status(200).json(result);
    });
  }      


  // Sửa phần chỗ này ------  
  Add_Phieukhambenh = (req, res, next) => {
    const ngay = new Date().toISOString().split('T')[0]; // Lấy ngày hiện tại dạng YYYY-MM-DD
  
    // Lấy số thứ tự tiếp theo
    Connect_Data_Model.GetNextSTT_M(ngay, req.body.Id_CaKham.trim(), (error, nextSTT) => {
      if (error) return next(error);
  
      const Data_Add = {
        Id_TheKhamBenh: req.body.Id_TheKhamBenh.trim(),
        Id_Bacsi : req.body.Id_Bacsi.trim(),
        Id_NguoiTiepNhan: req.body.Id_NguoiTiepNhan.trim(),
        Id_GiaDichVu: req.body.Id_GiaDichVu.trim(),
        LyDoDenKham : req.body.LyDoDenKham.trim(),
        Ngay: ngay,
        TrangThaiThanhToan: false,
        STTKham: 0,
        TrangThai: false ,
        TrangThaiHoatDong : "Kham"
      };
  
      if (!Data_Add) return res.status(400).json({ message: "Không có dữ liệu để thêm phiếu khám bệnh" });
      Connect_Data_Model.Add_Phieukhambenh_M(Data_Add, (Error, Result) => {
        if (Error) return next(Error);
        res.status(201).json({ message: "Thêm mới phiếu khám bệnh thành công", data: Result });
      });
    });
  };


   
  BoQuaPhieuKham = (req , res , next) => {
    const ID  = req.params.ID;
    const Status = req.query.TrangThaiHoatDong;
    if(Status !=="Kham" && Status !=="XetNghiem" && Status !=="BoQua"){
      return res.status(500).json({ message: "Vui lòng bắt buộc phải truyền TrangThaiHoatDong: Kham, XetNghiem, BoQua"})
    }

    Connect_Data_Model.BoQuaPhieuKham__M (ID , Status , (error , result) => {
      if (error) return next(error);
      res.status(201).json({ message: "Cập Nhật Trạng Thái Hoạt Động Thành Công", data: result });
    });
  }


  
  // chức năng xác nhận thanh toán
  PaymentConfirmation = (req, res, next) => {
    const Id_PhieuKhamBenh = req.params.Id_PhieuKhamBenh;
    Connect_Data_Model.Select_Check_Status_Phieukhambenh_M(Id_PhieuKhamBenh, (error, result) => {
      if (error) return next(error);
      if (!result || result.length === 0) {
          return res.status(404).json({ message: "Không tìm thấy phiếu khám bệnh" });
        }

      if(result[0].TrangThaiThanhToan === true){
          return res.status(200).json({
            message: "Phiếu khám bệnh đã được thanh toán trước đó",
            data: result
          })
        }else{
          Connect_Data_Model.GetNextSTT_M(result[0].Ngay, result[0].Id_CaKham, (error, nextSTT) => { 

            Connect_Data_Model.PaymentConfirmation_M(Id_PhieuKhamBenh,nextSTT,(error, result)=>{
              if (error) return next(error);
              return res.status(200).json({
                message: "Xác nhận thanh toán đơn thuốc thành công",
                data: result
              })
            })
          });
        
        }
    });
  };
  

  Fill_Cakhambenh = (req, res, next) => {
    const ngayHienTai = new Date().toISOString().split('T')[0];
    const id = req.query.Id;
    const ngay = req.query.ngay || ngayHienTai;
    const TrangThai = req.query.TrangThai || false;
    const limit = parseInt(req.query.limit)||7;
    const page = parseInt(req.query.page)||1;
    const TrangThaiHoatDong = req.query.TrangThaiHoatDong || null;
    Connect_Data_Model.Check_Benhnhan__M (page,limit,id, ngay, TrangThai,TrangThaiHoatDong ,(error, result) => {
      if (error) return next(error);
      res.status(200).json({ data: result });
    });
  };



  TimKiemBenhNhanBangSDTHoacIdTheKhamBenh = (req, res, next) => {
    const ngayHienTai = new Date().toISOString().split('T')[0];
    const id = req.query.Id || null;
    const SDT = req.query.SDT||null;
    const Id_TheKhamBenh = req.query.Id_TheKhamBenh||null;
    const TrangThaiThanhToan = req.query.TrangThaiThanhToan || null;
    const ngay = req.query.ngay || ngayHienTai;
    const TrangThai = req.query.TrangThai || false;
    const limit = parseInt(req.query.limit)||7;
    const page = parseInt(req.query.page)||1;
    const TrangThaiHoatDong = req.query.TrangThaiHoatDong || null;
    Connect_Data_Model.TimKiemBenhNhanBangSDTHoacIdTheKhamBenh__M (page,limit,id, ngay, TrangThai,TrangThaiHoatDong, TrangThaiThanhToan, SDT,Id_TheKhamBenh,(error, result) => {
      if (error) return next(error);
      res.status(200).json({ data: result });
    });
  };


  
  Edit_Phieukhambenh = (req, res, next) => {
    const { ID } = req.params;
    const Data_Edit = {
      Ngay: new Date(),
      TrangThaiThanhToan: req.body.TrangThaiThanhToan.trim(),
      STTKham: req.body.STTKham.trim()
    };

    if (!Data_Edit) return res.status(400).json({ message: "Không có dữ liệu để cập nhật phiếu khám bệnh" }); // ✅ Đã sửa thành chuẩn response JSON
    Connect_Data_Model.Edit_Phieukhambenh_M(ID, Data_Edit, (Error, Result) => {
      if (Error) return next(Error);
      res.status(200).json({ message: "Cập nhật phiếu khám bệnh thành công", data: Result }); // ✅ Đã sửa thành chuẩn response JSON
    });
  };

  
  Delete_Phieukham = (req, res, next) => {
    const { ID } = req.params;
    if (!ID) return res.status(400).json({ message: "Thiếu ID để xóa phiếu khám bệnh" }); // ✅ Đã sửa thành chuẩn response JSON
    Connect_Data_Model.Delete_Phieukhambenh_M(ID, (Error, Result) => {
      if (Error) return next(Error);
      res.status(200).json({ message: "Xóa phiếu khám bệnh thành công", data: Result }); // ✅ Đã sửa thành chuẩn response JSON
    });
  };
  

  Get_Not_Yet_Paid = (req, res, next) =>{
    const ngayHienTai = new Date().toISOString().split('T')[0];
    const ngay = req.query.ngay || ngayHienTai;
    const TrangThaiThanhToan = req.query.TrangThaiThanhToan ;
    const limit = parseInt (req.query.limit)||7;
    const page = parseInt (req.query.page)||1;
    if(!TrangThaiThanhToan) return res.status(500).json({ message: "Vui lòng truyền trạng thái thanh toán"});
    Connect_Data_Model.Get_Not_yet_paid(page,limit,ngay,TrangThaiThanhToan,(err,result)=>{
      if (err) return res.status(500).json({ message: "Lỗi server", error: err });
      if (!result || result.length === 0) {
        return res.status(404).json({ message: "Không tìm thấy yêu cầu nào phù hợp" });
      }
      res.status(200).json(result);
    })
  }


  Status_handling = (req , res , next) => {
    const ID = req.params.ID;
    Connect_Data_Model.Select_Check_Status_Phieukhambenh_M (ID , (err , result) => {
      if (err) return res.status(500).json({ message: "Lỗi server", error: err });
      if (result[0].TrangThai) return res.status(200).json ({message : "Trạng thái đã được xác nhận trước đó" , error: err });
      Connect_Data_Model.Upload_Status_handling__M (ID , (err , result) => {
        if (err) return res.status(500).json({ message: "Lỗi server", error: err });
        return res.status(200).json({ message: "Xác nhận trạng thái thành công" });
      });
    });
  }



}

module.exports = Phieu_Kham_Benh;
