const Connect_Khoa = require("../Model/Khoa");
const Connect_Data_Model = new Connect_Khoa();

class Khoa_Controler {
  Runviews = (req, res, next) => res.status(200).json({ message: "Loadding Thành Công" }); // ✅ Đã sửa thành chuẩn response JSON

  Select_Khoa = (req, res, next) => {
    const TrangThaiHoatDong = req.query.TrangThaiHoatDong || null;
    const limit = parseInt (req.query.limit) || 7;
    const page = parseInt (req.query.page) || 1;
      
    Connect_Data_Model.Select_Khoa_M(page ,  limit, TrangThaiHoatDong ,(error, result) => {
      if (error) return next(error);
      if (!result || result.length < 1) { // ✅ Kiểm tra dữ liệu rỗng
        return res.status(404).json({ message: "Dữ liệu khoa rỗng" }); // ✅ Đã sửa thành chuẩn response JSON
      }
      res.status(200).json(result);
    });
  };


  Search = (req, res, next) => {
    const TenKhoa = req.query.Key;

    if (!TenKhoa) return res.status(400).json({ message: "Thiếu key tìm kiếm" });
    Connect_Data_Model.Search__M (TenKhoa , (error, result) => {
      if (error) return next(error);
      if (!result) return res.status(404).json([]);
      return res.status(200).json(result);
    });
  };




  
  getDetailKhoa = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Thiếu ID để lấy chi tiết khoa" });
  }

  Connect_Data_Model.Get_Khoa_ByID(id, (error, foundKhoa) => {
    if (error) {
      return res.status(500).json({ message: 'Lỗi khi lấy chi tiết khoa', error });
    }

    if (!foundKhoa) {
      return res.status(404).json({ message: 'Không tìm thấy khoa' });
    }

    return res.status(200).json({
      message: 'Lấy chi tiết khoa thành công',
      data: foundKhoa,
    });
  });
};

  
  add_Khoa = (req, res, next) => {
    const data = {
      TenKhoa: req.body.TenKhoa?.trim(),
      TrangThaiHoatDong : true
    };
   
    if (!data.TenKhoa) {
      return res.status(400).json({ message: "Tên khoa không được để trống" }); // ✅ Đã sửa thành chuẩn response JSON
    }

    Connect_Data_Model.Insert_Khoa_M(data, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Thêm khoa thất bại", error: err }); // ✅ Đã sửa thành chuẩn response JSON
      }
      res.status(201).json({ message: "Thêm khoa thành công", data: result }); // ✅ Đã sửa thành chuẩn response JSON
    });
  };
   

  
  ThayDoiTrangThaiHoatDong = (req , res , next) => {
    const TrangThaiHoatDong = req.query.TrangThaiHoatDong;
    const ID = req.params.ID;

    if (!TrangThaiHoatDong) res.status(500).json ({message : "Vui lòng truyền trạng thái hoạt động"});
    Connect_Data_Model.ChinhTrangThaiHoatDong__M (ID, TrangThaiHoatDong , (error, result) => {
      if (error) return next (error) 
      if (!result) return res.status(404).json({ message: 'Không tìm thấy khoa để xóa' }); 
      return res.status(200).json({
        message: 'Cập Nhật Trạng Thái Hoạt Động Thành Công',
        data: result, 
      });
    });
  }




  deleteKhoa = (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Thiếu ID để xóa khoa" }); // ✅ Đã sửa thành chuẩn response JSON

    Connect_Data_Model.Delete_Khoa_M(id, (error, deletedKhoa) => {
      if (error) {
        return res.status(500).json({ message: 'Lỗi khi xóa khoa', error }); // ✅ Đã sửa thành chuẩn response JSON
      }

      if (!deletedKhoa) {
        return res.status(404).json({ message: 'Không tìm thấy khoa để xóa' }); // ✅ Đã sửa thành chuẩn response JSON
      }

      return res.status(200).json({
        message: 'Xóa khoa thành công',
        data: deletedKhoa, // ✅ Trả lại dữ liệu khoa đã xóa
      });
    });
  };

  updateKhoa = (req, res) => {
  const { id } = req.params;
  const data = {
    TenKhoa: req.body.TenKhoa?.trim(),
    TrangThaiHoatDong: req.body.TrangThaiHoatDong
  };

  if (!data.TenKhoa) {
    return res.status(400).json({ message: "Tên khoa không được để trống" });
  }

  // Nếu không truyền TrangThaiHoatDong, thì không update field đó
  if (typeof data.TrangThaiHoatDong === 'undefined') {
    delete data.TrangThaiHoatDong;
  }

  Connect_Data_Model.Update_Khoa_M(id, data, (error, updatedKhoa) => {
    if (error) {
      return res.status(500).json({ message: 'Lỗi khi cập nhật khoa', error });
    }

    if (!updatedKhoa) {
      return res.status(404).json({ message: 'Không tìm thấy khoa để cập nhật' });
    }

    return res.status(200).json({
      message: 'Cập nhật khoa thành công',
      data: updatedKhoa,
    });
  });
};

}

module.exports = Khoa_Controler;
