const Connect_Cakham = require("../Model/Ca_kham");
const Connect_Data_Model = new Connect_Cakham();

class Cakham_Controler {
  Runviews = (req, res, next) => res.status(200).json({ message: "Loadding Thành Công" }); // ✅ Chuẩn hóa phản hồi

  Select_Cakham = (req, res, next) => {
    const limit = parseInt(req.query.limit)|| 7;
    const page = parseInt(req.query.page)|| 1;
    Connect_Data_Model.Select_Cakham_M(page,limit,(error, result) => {
      if (error) return next(error);
      if (!result || result.length < 1) { // ✅ Kiểm tra dữ liệu rỗng
        return res.status(404).json({ message: "Dữ liệu ca khám rỗng" }); // ✅ Chuẩn hóa phản hồi
      }
      res.status(200).json(result);
    });
  };
  

  Get_Count_Cakham = (req, res, next) => {
    const ID_Cakham = req.params.ID_CaKham;
    const Date = req.query.date;

    Connect_Data_Model.Get_Count_Cakham__M(ID_Cakham, Date, (error, result) => {
      if (error) return next(error);
      res.status(200).json({ message: `Số lượng bệnh nhân đăng khám ngày ${Date} là : ${result}` });
    });
  };


  
  Get_ByKhoa = (req, res, next) => {
    const Id_Khoa = req.params.ID;
    const Id_LoaiCa = req.query.Id_LoaiCa || null;
    if(!Id_Khoa) return res.status(500).json({ message: "Cần truyền Id_Khoa vào đẻ lọc" });
    const limit = parseInt(req.query.limit)||7;
    const page = parseInt(req.query.page)||1;
    Connect_Data_Model.Get_ByKhoa_M(page,limit,Id_LoaiCa,Id_Khoa,(error, result) => {
      if (error) return next(error);
      if (!result || result.length < 1) { // ✅ Kiểm tra dữ liệu rỗng
        return res.status(404).json({ message: "Dữ liệu ca khám rỗng" }); // ✅ Chuẩn hóa phản hồi
      }
      res.status(200).json(result);
    });
  };


  add_Cakham = (req, res, next) => {
    const data = {
      Id_BacSi: req.body.Id_BacSi?.trim(),
      Id_PhongKham: req.body.Id_PhongKham?.trim(),
      Id_LoaiCa: req.body.Id_LoaiCa?.trim(),
      TenCa: req.body.TenCa?.trim(),
      TrangThaiHoatDong: true,
    };

    // ✅ Kiểm tra dữ liệu hợp lệ
    if (!data.Id_BacSi || !data.Id_PhongKham ||  !data.Id_LoaiCa) {
      return res.status(400).json({ message: "Thiếu dữ liệu cần thiết" }); // ✅ Kiểm tra dữ liệu hợp lệ
    }

    Connect_Data_Model.Insert_Cakham_M(data, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Thêm ca khám thất bại", error: err });
      }
      res.status(201).json({ message: "Thêm ca khám thành công", data: result }); // ✅ Chuẩn hóa response
    });
  };



  deleteCakham = (req, res, next) => {
    const { id } = req.params;

    // ✅ Kiểm tra ID hợp lệ
    if (!id) return res.status(400).json({ message: "Thiếu ID để xóa ca khám" }); // ✅ Kiểm tra ID hợp lệ

    Connect_Data_Model.Delete_Cakham_M(id, (error, deletedCakham) => {
      if (error) {
        return res.status(500).json({ message: 'Lỗi khi xóa ca khám', error });
      }

      if (!deletedCakham) {
        return res.status(404).json({ message: 'Không tìm thấy ca khám để xóa' }); // ✅ Chuẩn hóa response
      }

      return res.status(200).json({
        message: 'Xóa ca khám thành công',
        deletedCakham
      });
    });
  };

  updateCakham = (req, res, next) => {
    const { id } = req.params;
    const data = {
      Id_BacSi: req.body.Id_BacSi,
      Id_PhongKham: req.body.Id_PhongKham?.trim(),
      Id_LoaiCa: req.body.Id_LoaiCa?.trim(),
      TenCa: req.body.TenCa?.trim(),
      TrangThaiHoatDong: req.body.TrangThaiHoatDong,
    };

   // ✅ Kiểm tra dữ liệu hợp lệ
    if (!data.Id_BacSi || !data.Id_PhongKham ) {
      return res.status(400).json({ message: "Thiếu dữ liệu cần thiết" }); // ✅ Kiểm tra dữ liệu hợp lệ
    }


    Connect_Data_Model.Update_Cakham_M(id, data, (error, updatedCakham) => {
      if (error) {
        return res.status(500).json({ message: 'Lỗi khi cập nhật ca khám', error });
      }

      if (!updatedCakham) {
        return res.status(404).json({ message: 'Không tìm thấy ca khám để cập nhật' }); // ✅ Chuẩn hóa response
      }

      return res.status(200).json({
        message: 'Cập nhật ca khám thành công',
        updatedCakham
      });
    });
  };
}

module.exports = Cakham_Controler;
