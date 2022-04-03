const express=require('express')
const dbcon =require('./config');
const comment=require('./models/answer')
const jwt =require('jsonwebtoken')
const multer=require('multer')
require("dotenv").config('.env');
const { connectMongoDB } = require("./Database/database");
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt=require('bcrypt');
const AuthRoute=require('./routes/AuthRoute')
const controller=require('./controler/controller')
const main = async () => {
    const authToken=(token)=>{

    }


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
        console.log(req.headers.authorization)
        // console.log(req.files)
        const authHeader=req.body['authorization'] || req.headers.authorization;
        
        const token=authHeader && authHeader.split(" ")[1]
        if(token==null)
        {
            return res.sendStatus(401); 
        }
        jwt.verify(token,String(process.env.ACCESS_TOKEN_SECRET),(err,user)=>{
            if(err) {return res.sendStatus(401)}
            req.user=user
            next()
            
        })
   
    }  
    app.post('/register',controller.register)
    app.post('/login',controller.login)
    
    // app.post("/api/uploadimage",authenticateToken,(req,res)=>{

    //     // console.log(req.body)
        
    //     // console.log(res)
    //     res.send("Image Uploaded")
    // })

    app.use('/api',authenticateToken,AuthRoute);

    app.use(cors({origin: 'http://localhost:3000'}));
    app.listen(port,()=>{
        console.log(`Server started at port :${port}`)
    });

}
main();

