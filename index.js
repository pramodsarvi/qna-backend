const express=require('express')
const dbcon =require('./config');
const comment=require('./models/answer')
const jwt =require('jsonwebtoken')
require("dotenv").config('.env');
const { connectMongoDB } = require("./Database/database");
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt=require('bcrypt');
const AuthRoute=require('./routes/AuthRoute')
const controller=require('./controler/controller')
const main = async () => {
    const app = express();
    const port = process.env.PORT || 8000;
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    connectMongoDB();
    app.use(express.json());
    
    app.use(express.urlencoded({extended: true,}));
    const authenticateToken =(req,res,next)=>
{  

    const authHeader=req.body['authorization']
    // console.log(authHeader)
    const token=authHeader && authHeader.split(' ')[1]
    console.log("TOKEN:"+token)
    if(token==null)
    {
        return res.sendStatus(401); 
    }
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) return res.sendStatus("err")
        req.user=user
        // console.log(user)
        next()
        
    })
   
}  
    app.post('/api/register',controller.register)
    app.post('/api/login',controller.login)
    app.use('/api',authenticateToken,AuthRoute);

    app.use(cors({origin: 'http://localhost:3000'}));
    app.listen(port,()=>{
        console.log(`Server started at port :${port}`)
    });

}
main();

