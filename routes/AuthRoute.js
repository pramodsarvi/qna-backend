const express=require('express')
const router = express.Router();
const controller=require('../controler/controller')

router.post('/register',controller.register)
router.post('/login',controller.login)
router.post('/token',controller.token)
router.post('/logout',controller.logout)
router.post('/comment',controller.comment)
router.post('/user',controller.user)
router.post('/userinfo',controller.userinfo)
router.post('/getprojects',controller.getprojects)
router.post('/postcomments',controller.postcomment)
router.post('/getproject',controller.getproject)
router.post('/postproject',controller.postproject)
router.post('/question',controller.question)
router.post('/projectresponse',controller.projectresponse)
router.post('/getprojectresponse',controller.getprojectresponse)

router.post('/feed',controller.feed );
module.exports=router;