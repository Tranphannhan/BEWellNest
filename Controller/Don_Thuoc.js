const Connect_Donthuoc = require("../Model/Don_Thuoc");
const Connect_Data_Model = new Connect_Donthuoc();

class Donthuoc_Controler {
  Runviews = (req, res, next) => res.status(200).json({ message: "Loadding Thành Công" }); // ✅ Chuẩn hóa phản hồi

  Select_Donthuoc = (req, res, next) => {
    const limit = parseInt(req.query.limit)|| 7;
    const page = parseInt(req.query.page)|| 1;
    Connect_Data_Model.Select_Donthuoc_M(page, limit,(error, result) => {
      if (error) return next(error);
      if (!result || result.length < 1) { 
        return res.status(404).json({ message: "Dữ liệu Đơn Thuốc rỗng" }); // ✅ Chuẩn hóa response
      }
      res.status(200).json(result);
    });
  };


  Detail_Donthuoc =  (req, res, next) => {
    const ID  =  req.params.ID;
    Connect_Data_Model.Detail__M (ID  , (error , result) => {
    if (error) return next(error);
      res.status(200).json(result);
    });
  }    
   

  GET_Phieu_Kham_Benh = (req, res, next) => {
    const ID  =  req.params.ID;
    Connect_Data_Model.GET_Phieu_Kham_Benh__M (ID  , (error , result) => {
    if (error) return next(error);
      res.status(200).json(result);
    });
  }    



  PaymentConfirmation = (req, res, next) => {
    const Id_DonThuoc = req.params.ID_DonThuoc;
    Connect_Data_Model.Select_Check_Status_Donthuoc_M(Id_DonThuoc, (error, result) => {
      if (error) return next(error);
  
      // Kiểm tra nếu không có dữ liệu
      if (!result || result.length === 0) {
        return res.status(404).json({ message: "Không tìm thấy đơn thuốc" });
      }

      if(result[0].TrangThaiThanhToan === true){
        return res.status(200).json({
          message: "Đơn thuốc đã được thanh toán trước đó",
          data: result
        })
      }else{
        Connect_Data_Model.PaymentConfirmation_M(Id_DonThuoc,(error, result)=>{
          if (error) return next(error);
          return res.status(200).json({
            message: "Xác nhận thanh toán đơn thuốc thành công",
            data: result
          })
        })
      }

    });
  };


  //
  Select_Status_Donthuoc = (req , res , next) => {
    const Date = req.query.date;
    Connect_Data_Model.Select_Status_Donthuoc__M (Date , (error , result) => {
      if (error) return next (error);
      if (result.length === 0) return res.status(200).json ({message : `Trạng thái đã phát hết thuốc cho bệnh nhân ngày : ${Date}`});
      res.status(200).json ({
        message : `Số lượng bênh nhận chưa được phát thuốc ngày : ${Date} là : ${result.length}`,
        data : result
      });
    });
  }



  // Danh sách phát thuốc nhưng có phân trang
  MedicineDistributionList_Pagination = (req , res , next) => {
   const ngayHienTai = new Date().toISOString().split('T')[0];
   const selectedDate = req.query.date || ngayHienTai;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 7;
    Connect_Data_Model.MedicineDistributionList_Pagination_M (page,limit,selectedDate , (error , result) => {
      if (error) return next (error);
      if (result.length === 0) return res.status(200).json ({totalItems:0, currentPage: 0, totalPages: 0,data: null});
      res.status(200).json(result);
    });
  }

  HistoryOfMedicineDispensing_Pagination = (req , res , next) => {
   const ngayHienTai = new Date().toISOString().split('T')[0];
   const selectedDate = req.query.date || ngayHienTai;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 7;
    Connect_Data_Model.HistoryOfMedicineDispensing_Pagination_M (page,limit,selectedDate , (error , result) => {
      if (error) return next (error);
      if (result.length === 0) return res.status(200).json ({totalItems:0, currentPage: 0, totalPages: 0,data: null});
      res.status(200).json(result);
    });
  }
  
    KiemTraDonThuocDangTao = (req, res, next) => {
      const TrangThai = req.query.TrangThai || 'DangTao';
      const Id_PhieuKhamBenh = req.query.Id_PhieuKhamBenh;

      if (!Id_PhieuKhamBenh) {
        return res.status(400).json({ message: 'Thiếu Id_PhieuKhamBenh' });
      }
      Connect_Data_Model.KiemTraDonThuocDangTao_M(
        TrangThai,
        Id_PhieuKhamBenh,
        (error, result) => {
          if (error) return res.status(500).json({ message: 'Lỗi truy vấn', error });
          return res.status(200).json(result);
        }
      );
    };


  // 
  add_Donthuoc = (req, res, next) => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString('vi-VN'); 
    const data = {
      Id_PhieuKhamBenh: req.body.Id_PhieuKhamBenh,
      TenDonThuoc: req.body.TenDonThuoc?.trim(),
      TrangThaiThanhToan: false,
      Gio:formattedTime,
      TrangThai: 'DangTao',
    };

    // ✅ Kiểm tra dữ liệu hợp lệ
    if (!data.Id_PhieuKhamBenh || !data.TenDonThuoc) {
      return res.status(400).json({ message: "Thiếu dữ liệu cần thiết" }); // ✅ Chuẩn hóa response
    }

    Connect_Data_Model.Insert_Donthuoc_M(data, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Thêm đơn thuốc thất bại", error: err });
      }
      res.status(201).json({ message: "Thêm đơn thuốc thành công", data: result }); // ✅ Chuẩn hóa response
    });
  };

  deleteDonthuoc = (req, res, next) => {
    const { id } = req.params;
  
    // ✅ Kiểm tra ID hợp lệ
    if (!id) return res.status(400).json({ message: "Thiếu ID để xóa Đơn Thuốc" }); // ✅ Kiểm tra ID hợp lệ

    Connect_Data_Model.Delete_Donthuoc_M(id, (error, deletedDonthuoc) => {
      if (error) {
        return res.status(500).json({ message: 'Lỗi khi xóa đơn thuốc', error });
      }
  
      if (!deletedDonthuoc) {
        return res.status(404).json({ message: 'Không tìm thấy đơn thuốc để xóa' }); // ✅ Chuẩn hóa response
      }
  
      return res.status(200).json({
        message: 'Xóa đơn thuốc thành công',
        deletedDonthuoc
      });
    });
  };

  updateDonthuoc = (req, res, next) => {
    const { id } = req.params;
    const data = {
      TenDonThuoc: req.body.TenDonThuoc?.trim(),
    };

    Connect_Data_Model.Update_Donthuoc_M(id, data, (error, updatedDonthuoc) => {
      if (error) {
        return res.status(500).json({ message: 'Lỗi khi cập nhật đơn thuốc', error });
      }
  
      if (!updatedDonthuoc) {
        return res.status(404).json({ message: 'Không tìm thấy đơn thuốc để cập nhật' }); // ✅ Chuẩn hóa response
      }
  
      return res.status(200).json({
        message: 'Cập nhật đơn thuốc thành công',
        updatedDonthuoc
      });
    });
  }

  Get_Not_Yet_Paid = (req, res, next) =>{
    const ngayHienTai = new Date().toISOString().split('T')[0];
    const ngay = req.query.ngay || ngayHienTai;
    const TrangThaiThanhToan = req.query.TrangThaiThanhToan ;
    const limit = parseInt (req.query.limit)||7;
    const page = parseInt (req.query.page)||1;
    if(!TrangThaiThanhToan) return res.status(500).json({massage:"Vui lòng truyền vào trạng thái thanh toán"})
    Connect_Data_Model.Get_Not_yet_paid(page, limit, ngay, TrangThaiThanhToan, (err,result)=>{
      if (err) return res.status(500).json({ message: "Lỗi server", error: err });
      if (!result || result.length === 0) {
        return res.status(404).json({ message: "Không tìm thấy yêu cầu nào phù hợp" });
      }
      res.status(200).json(result);
    })
  }  

  TimKiemBenhNhanBangSDTHoacIdTheKhamBenh =  (req,res,next) =>{
    const ngayHienTai = new Date().toISOString().split('T')[0];
    const Ngay = req.query.ngay || ngayHienTai;
    const TrangThai = req.query.TrangThai || null;
    const TrangThaiThanhToan = req.query.TrangThaiThanhToan || null;
    const Id_TheKhamBenh = req.query.Id_TheKhamBenh || null;
    const SoDienThoai = req.query.SDT || null;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 7;
    Connect_Data_Model.TimKiemBenhNhanBangSDTHoacIdTheKhamBenh_M(page,limit,TrangThai, TrangThaiThanhToan, Ngay, Id_TheKhamBenh, SoDienThoai,(err , result)=>{
      if (err) return res.status(500).json({ message: "Lỗi server", error: err });
      res.status(200).json(result)
    })
  }

ThayDoiTrangThai = (req, res, next) => {
  const { ID } = req.params;
  const TrangThai = req.query.TrangThai || '';
  const Id_NguoiPhatThuoc = req.query.ID || null;
  const data = {};

  if (!['DaXacNhan', 'DaPhatThuoc'].includes(TrangThai)) {
    return res.status(400).json({ message: 'Vui lòng truyền trạng thái: DaXacNhan hoặc DaPhatThuoc' });
  }

  if (Id_NguoiPhatThuoc !== null) {
    data.Id_NguoiPhatThuoc = Id_NguoiPhatThuoc;
  }

  data.TrangThai = TrangThai;

  Connect_Data_Model.ThayDoiTrangThai_M(ID, data, (error, updatedDonthuoc) => {
    if (error) {
      return res.status(500).json({ message: 'Lỗi khi cập nhật đơn thuốc', error });
    }

    if (!updatedDonthuoc) {
      return res.status(404).json({ message: 'Không tìm thấy đơn thuốc để cập nhật' });
    }

    return res.status(200).json({
      message: 'Cập nhật đơn thuốc thành công',
      updatedDonthuoc
    });
  });
};


  Status_handling = (req , res , next) => {
    const ID = req.params.ID;
    const Id_NguoiPhatThuoc = req.query.Id_NguoiPhatThuoc;
    if(!ID || !Id_NguoiPhatThuoc){
      return res.status(500).json({massage:"Thiếu Id_Donthuoc, Id_NguoiPhatThuoc"})
    }
    Connect_Data_Model.Select_Check_Status_Donthuoc_M (ID , (err , result) => {
    if (err) return res.status(500).json({ message: "Lỗi server", error: err });

    if (result[0].TrangThai) return res.status(200).json ({message : "Trạng thái đã được xác nhận trước đó" , error: err });
     if (result[0].TrangThaiThanhToan === false) return res.status(200).json ({message : "Đơn thuốc này chưa được thanh toán" , error: err });
    Connect_Data_Model.Upload_Status_handling__M (Id_NguoiPhatThuoc , ID , (err , result) => {
        if (err) return res.status(500).json({ message: "Lỗi server", error: err });
        return res.status(200).json({ message: "Xác nhận trạng thái thành công" });
      });
    });
  }  
  
  SearchDS = (req,res,next) =>{
    const query = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 7;
    Connect_Data_Model.SearchDS_M(page,limit,query,(err , result)=>{
      if (err) return res.status(500).json({ message: "Lỗi server", error: err });
      res.status(200).json(result)
    })
  }

  // Thống kê đơn thuốc
  Filter_Donthuoc_ByDate = async (req, res, next) => {
  const { fromDate, toDate, year } = req.query;
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;

  try {
    const result = await Connect_Data_Model.Filter_Donthuoc_ByDate_M(limit, page, { fromDate, toDate, year });

    if (!result || result.data.length < 1) {
      return res.status(404).json({ message: "Không tìm thấy dữ liệu đơn thuốc theo thời gian." });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};



}

module.exports = Donthuoc_Controler;
