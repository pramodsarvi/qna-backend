const express=require('express');
const routes=express.Router();

const loginController=require('../controller/loginController');
routes.get('/',loginController.login);
module.exports=routes;