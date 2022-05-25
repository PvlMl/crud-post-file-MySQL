const multer  = require("multer");
module.exports = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "uploads")
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
  });