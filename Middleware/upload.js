   
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/image"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },  
});    

const uploadMiddleware_Ketquaxetnghiem = multer({ storage });

module.exports = {  
  uploadMiddleware_Ketquaxetnghiem,
};
  