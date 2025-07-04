
const Connect_Select_Yeu_Cau_Xet_Nghiem = require("../Model/Yeu_Cau_Xet_Nghiem");
const Connect_Data_Model = new Connect_Select_Yeu_Cau_Xet_Nghiem();

class Yeucauxetnghiem_Controler {
  Runviews = (req, res, next) => {
    res.status(200).json({ message: "Loadding Thành Công" });
  };

  Select_Yeucauxetnghiem = (req, res, next) => {
    Connect_Data_Model.Select_Yeucauxetnghiem_M((error, result) => {
      if (error) return next(error);
      if (result.length < 1) return res.status(404).json({ message: "Dữ liệu Yeucauxetnghiem Rỗng" });
      res.status(200).json(result);
    });
  };
     

  Detail =  (req, res, next) => {
    const ID  =  req.params.ID;
    Connect_Data_Model.Detail__M (ID  , (error , result) => {
      if (error) return next(error);
      res.status(200).json(result);
    });
  }
 
  GET_LayTheoPhieuKhamBenh =  (req, res, next) => {
    const ID  =  req.params.ID;
    Connect_Data_Model.GET_LayTheoPhieuKhamBenh__M (ID  , (error , result) => {
      if (error) return next(error);
      res.status(200).json(result);
    });
  }


  PaymentConfirmation = (req, res, next) => {
    const Id_PhieuKhamBenh = req.query.Id_PhieuKhamBenh;
    if(!Id_PhieuKhamBenh) return res.status(404).json({ message: "Không có Id_PhieuKhamBenh" });
    Connect_Data_Model.Select_Check_Status_Yeucauxetnghiem_M ( Id_PhieuKhamBenh , (error, result) => {
      if (error) return next(error);
      if (!result || result.length === 0) {
        return res.status(404).json({ message: "không có yêu cầu xét nghiệm cần thanh toán" });
      }else{
        const listId = result.map(item => item._id);
          Connect_Data_Model.PaymentConfirmation_M(listId,(error, result)=>{
            if (error) return next(error);
            return res.status(200).json({
              message: "Xác nhận thanh toán yêu cầu xét nghiệm thành công",
              data: result
            })


          })
      }
    });
  }


Add_Yeucauxetnghiem = (req, res, next) => {
  const ngay = new Date().toISOString().split("T")[0];
  const now = new Date();
  const formattedTime = now.toLocaleTimeString('vi-VN'); // Kết quả: "14:25:30"

  const idPhieuKhamBenh = req.body.Id_PhieuKhamBenh?.trim();
  const idLoaiXetNghiem = req.body.Id_LoaiXetNghiem?.trim();

  if ( !idPhieuKhamBenh || !idLoaiXetNghiem) {
    return res.status(400).json({ message: "Thiếu thông tin yêu cầu" });
  }


    const Data_Add = {
      Id_PhieuKhamBenh: idPhieuKhamBenh,
      Id_LoaiXetNghiem: idLoaiXetNghiem,
      TrangThaiThanhToan: false,
      Ngay: ngay,
      Gio:formattedTime,
      STT: 0,
      TrangThai: false,
      TrangThaiHoatDong: false,
      BoQua:true
    };

    Connect_Data_Model.Add_Yeucauxetnghiem_M(Data_Add, (Error, Result) => {
      if (Error) return next(Error);
      res.status(201).json({ message: "Thêm Mới Yêu Cầu Khám Bệnh Thành Công" });
    });

};

   
    
  Boquatrangthaihoatdong = (req, res, next) => {
    const { ID } = req.params;
    Connect_Data_Model.Boquatrangthaihoatdong__M (ID , (Error, Result) => {
      if (Error) return next(Error);
      res.status(200).json({ message: "Cập Nhật Trạng Thái Thành Công" });
    });
  };


  Edit_Yeucauxetnghiem = (req, res, next) => {
    const { ID } = req.params;
    const Data_Edit = {
      Id_PhieuKhamBenh: req.body.Id_PhieuKhamBenh.trim(),
      Id_LoaiXetNghiem: req.body.Id_LoaiXetNghiem.trim(),
      TrangThaiThanhToan: req.body.TrangThaiThanhToan.trim(),
      STT: req.body.STT.trim(),
    };

    if (!Data_Edit) return res.status(400).json({ message: "Không có dữ liệu" });

    Connect_Data_Model.Edit_Yeucauxetnghiem_M(ID, Data_Edit, (Error, Result) => {
      if (Error) return next(Error);
      res.status(200).json({ message: "Cập Nhật Yêu Cầu Khám Bệnh Thành Công" });
    });
  };

  Delete_Yeucauxetnghiem = (req, res, next) => {
    const { ID } = req.params;
    if (!ID) return res.status(400).json({ message: "Không có dữ liệu" });

    Connect_Data_Model.Delete_Yeucauxetnghiem_M(ID, (Error, Result) => {
      if (Error) return next(Error);
      res.status(200).json({ message: "Đã loại bỏ thành công yêu cầu xét nghiệm" });
    });
  };

  Get_ById_PTB_Date = (req, res, next) => {
      const ngayHienTai = new Date().toISOString().split('T')[0];
    const ngay = req.query.ngay || ngayHienTai;
    const  Id_PhongThietBi = req.query.Id_PhongThietBi;
    const limit = parseInt(req.query.limit)||7;
    const page = parseInt(req.query.page)||1;
    const TrangThai = req.query.TrangThai || false;
    const BoQua  =  req.query.BoQua || null
    if (!Id_PhongThietBi || !ngay) {
      return res.status(400).json({ message: "Không có ngày hoặc Id_PhongThietBi" });
    }
    
    Connect_Data_Model.Get_By_PTB_Date_M(page,limit,TrangThai, BoQua,Id_PhongThietBi, ngay, (err, result) => {
      if (err) return res.status(500).json({ message: "Lỗi server", error: err });

      if (!result || result.length === 0) {
        return res.status(404).json({ message: "Không có yều cầu xét nghiệm" });
      }

      res.status(200).json(result);
    });
  };

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

    Get_Not_yet_paid_Detail = (req, res, next) =>{
    const ngayHienTai = new Date().toISOString().split('T')[0];
    const ngay = req.query.ngay || ngayHienTai;
    const Id_PhieuKhamBenh = req.query.Id_PhieuKhamBenh;
    const TrangThaiThanhToan = req.query.TrangThaiThanhToan || null;
    const TrangThai = req.query.TrangThai || null;
    const limit = parseInt (req.query.limit)||7;
    const page = parseInt (req.query.page)||1;
    if(!Id_PhieuKhamBenh) return res.status(500).json({massage:"Vui lòng truyền vào Id_PhieuKhamBenh"})
    Connect_Data_Model.Get_Not_yet_paid_Detail(page, limit, ngay, TrangThaiThanhToan, TrangThai,Id_PhieuKhamBenh, (err,result)=>{
      if (err) return res.status(500).json({ message: "Lỗi server", error: err });
      if (!result || result.length === 0) {
        return res.status(404).json({ message: "Không tìm thấy yêu cầu nào phù hợp" });
      }
      res.status(200).json(result);
    })
  }

  TimKiemBenhNhanBangSDTHoacIdTheKhamBenh = (req, res, next) => {
    const ngayHienTai = new Date().toISOString().split('T')[0];
    const id_PhongThietBi = req.query.Id || null;
    const SDT = req.query.SDT||null;
    const Id_TheKhamBenh = req.query.Id_TheKhamBenh||null;
    const ngay = req.query.ngay || ngayHienTai;
    const TrangThaiThanhToan = req.query.TrangThaiThanhToan||null;
    const TrangThai = req.query.TrangThai || false;
    const limit = parseInt(req.query.limit)||7;
    const page = parseInt(req.query.page)||1;
    const TrangThaiHoatDong = req.query.TrangThaiHoatDong || null;
    Connect_Data_Model.TimKiemBenhNhanBangSDTHoacIdTheKhamBenh__M (page,limit,id_PhongThietBi, ngay, TrangThai,TrangThaiHoatDong, TrangThaiThanhToan, SDT,Id_TheKhamBenh,(error, result) => {
      if (error) return next(error);
      res.status(200).json({ data: result });
    });
  };


  //    
Status_handling = (req, res, next) => {
  const ID = req.params.ID;
    Connect_Data_Model.Upload_Status_handling__M(ID, (err, resultUpdate) => {
      if (err) {
        console.error("Lỗi cập nhật xét nghiệm: 2", err);
        return res.status(500).json({ message: "Lỗi server 2", error: err });
      }

      return res.status(200).json({ message: "Xác nhận trạng thái thành công", data: resultUpdate });
    });
};


Filter_Yeucauxetnghiem_ByDate = async (req, res, next) => {
  const { fromDate, toDate, year } = req.query;
  const limit = parseInt(req.query.limit) || 7;
  const page = parseInt(req.query.page) || 1;
  const all = req.query.all || false

  try {
    const result = await Connect_Data_Model.Filter_Yeucauxetnghiem_ByDate_M(limit, page,all, { fromDate, toDate, year });

    if (!result || result.data.length < 1) {
      return res.status(404).json({ message: "Không tìm thấy dữ liệu yêu cầu xét nghiệm theo thời gian." });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};  

Update_BoQua_Yeucauxetnghiem = (req, res, next) => {
  const id = req.query.id;
  const BoQua = req.query.BoQua;

  // Kiểm tra đầu vào
  if (!id || typeof BoQua === 'undefined') {
    return res.status(400).json({ message: 'Thiếu id hoặc BoQua' });
  }

  // Chuyển đổi BoQua từ string sang boolean
  const boQuaBoolean = BoQua === 'true';

  Connect_Data_Model.Update_BoQua_Yeucauxetnghiem_M(id, boQuaBoolean, (error, result) => {
    if (error) return next(error);
    res.status(200).json({
      message: `Cập nhật BoQua = ${boQuaBoolean} thành công cho id = ${id}`,
      data: result
    });
  });
};



}



module.exports = Yeucauxetnghiem_Controler;
