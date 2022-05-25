const express = require("express");
const multer  = require("multer");
  
const app = express();
 
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "uploads");
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});
 
app.use(multer({storage:storageConfig}).single("filedata"));
app.post("/upload", function (req, res) {

    let filedata = req.file;
    if(!filedata)
        res.send("upload error");
    else
        res.send("file loaded");
});
app.listen(3000, ()=>{console.log("Server started");});
