const express=require('express')
const dbcon =require('./config');
const jwt =require('jsonwebtoken')
require("dotenv").config('.env');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt=require('bcrypt');
const app=express();
app.use(cors())
// app.use
const port=process.env.PORT;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.get('/login',async (req,result)=>{
    try
    {   
        // console.log(req.body)
        // const username=;
        // var password="";
        const q="Select password from user where username=\'"+req.body.username+"\';";
        // console.log(req.body.password)
        dbcon.query(q,async (err,res)=>{ 
            if(err)
            {
                console.log('Error in connection',err)
            }
            else
            {       
                // return "HELLO";
                // console.log("1")
                // password=res;
                // console.log(res)
                // console.log(password[0].password)
                if(await bcrypt.compare(req.body.password,res[0].password))
                {   
                    // console.log("true");
                    dbcon.query("Select * from user where username =\'"+req.body.username+"\';", async (err,res2)=>{
                        if(err)
                        {
                            console.log("error");
                        }
                        else
                        {
                            try{
                                let user={'name':res2[0].name,'uid':res2[0].userid,'password':res2[0].password}
                                // console.log(user)
                                const accessToken=generateAccessToken(user)
                                const refreshToken=jwt.sign(user,process.env.REFRESH_TOKEN_SECRET)
                                result.json({accessToken:accessToken,refreshToken:refreshToken})
                            }
                            catch(err)
                            {
                                console.log(err);
                            }
                        }
                    })
                    // result.status(200).send();
                }
                else
                {
                    result.status(401).send();
                    console.log('False- Not Authenticated');
                }
            }
        })
    }
    catch(err)
    {   console.log(err);
        res.status(500).send()
    }
} );

app.post('/token',(req,res)=>{
    const refreshToken
})

function generateAccessToken(user)
{
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'15s'});
}