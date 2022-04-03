const express=require('express')
const app=express()
const multer=require('multer')
const path=require('path')

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"file_uploads")
    },
    filename:(req,file,cb)=>{
        console.log(file);
        cb(null,Date.now()+path.extname(file.originalname))
    }
})
const upload=multer({storage:storage})

// app.set('view engine',"ejs")
// app.get("/upload",(req,res)=>{
//     res.render("upload");
// })
// app.post("/upload",upload.single('file'),(req,res)=>{
//     res.send("Image Uploaded")
// })

exports.file_upload=upload;