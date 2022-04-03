const express=require('express')
const router = express.Router();
const path=require('path')
const multer=require('multer')
const file_upload=require('../file_uploads/multer')
const controller=require('../controler/controller')
// const authenticateToken=require('../controler/controller')

router.post('/token',controller.token)
router.post('/logout',controller.logout)
router.post('/comment',controller.comment)
router.post('/user',controller.user)
router.post('/userinfo',controller.userinfo)
router.post('/getprojects',controller.getprojects)
router.post('/getmyprojects',controller.getmyprojects)
router.post('/postcomments',controller.postcomment)
// router.post('/getproject',controller.getproject)
router.post('/postproject',controller.postproject)
router.post('/question',controller.question)
router.post('/updateprofile',controller.updateprofile)
router.post('/projectresponse',controller.projectresponse)
router.post('/getprojectresponse',controller.getprojectresponse)
router.post('/deleteproject',controller.deleteproject)
router.post('/sendEmail',controller.sendEmail)
const storage=multer.diskStorage({
    destination:'./file_uploads/files',
    filename:(req,file,cb)=>{

    cb(null,Date.now()+path.extname(file.originalname))  
    }
})
const upload=multer({storage:storage})
router.post('/uploadimage',upload.single('file'),controller.upload)

router.post('/feed',controller.feed );
module.exports=router;