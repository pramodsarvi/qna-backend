const express=require('express')
const dbcon =require('./config');
const jwt =require('jsonwebtoken')
require("dotenv").config('.env');
const { connectMongoDB } = require("./Database/database");
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt=require('bcrypt');
const app=express();
const users=require('./models/user');
const res = require('express/lib/response');
app.use(cors())
const port=process.env.PORT;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());




const main = async () => {
    const app = express();
    const port = process.env.PORT || 8000;
    connectMongoDB();
    app.use(cors({}));
    app.use(express.json());
    app.use(
      express.urlencoded({
        extended: true,
      })
    );
app.post('/demo',async (req,result)=>{
    try{
        console.log(req.body)
        // const body=req.body.json_payload;
        // console.log(body)
    }
    catch(e)
    {
        console.log(e)
    }
})
app.post('/register',async (req,result)=>{
    try
    {   
        const hashedPassword= await bcrypt.hash(req.body.password,10);
        try{
            // validate all fields
            const member = new users(req.body)
            // console.log(member)
            const data= await member.save();
            // member.save((err,savedData)=>{
            //     if (err)
            //     {
            //         return result.send(err);
            //     }
            //     else{
            //         console.log("hi")
            //         return result.send({"savedData":savedData});
            //     }
            // })
            result.status(200).send(data);
        }
        catch(error)
        {

        }
    //     const q="INSERT INTO `qna`.`user` (`name`, `colid`, `description`, `email`, `github`, `instagram`, `website`, `facebook`,`username`, `password`) VALUES (\""+name+"\", "+colid+", \""+description+"\", \""+email+"\", \""+github+"\", \""+instagram+"\", \""+website+"\", \""+facebook+"\",\""+username+"\" ,\""+hashedPassword+"\");"
        
    //     dbcon.query(q,(err,res)=>{
    //         if(err)
    //         {
    //             console.log('Error in connection',err)
    //             result.status(400).send();
    //         }
    //         else
    //         {
    //             result.status(200).send();
    //         }
    //     });

    }
    catch(err)
    {   console.log(err)
        res.status(500).send()
    }
})

app.post('/login',async (req,result)=>{
    try
    {  
        console.log(req.body) 
        const q="Select password from user where username=\'"+req.body.username+"\';";
        const user = await users.findOne({ username: req.body.username });
        // console.log(user)
       ///
        let user1={'name':user.name,'uid':user._id.userid,'password':user.password,'description':user.description,'email':user.email,'website':user.website,'logout':user.lastlog}
        console.log(user+" logged in\n")
        if (req.body.password==user.password)
        {   console.log('Valid')
            const refreshToken=jwt.sign(user1,process.env.REFRESH_TOKEN_SECRET)
            user2={'id':user.uid,'description':user.description,'lastlog':user.logout}
            const accessToken=generateAccessToken(user2)
            if((await addRefreshToken(user.uid,refreshToken)))
                console.log("Could not add refresh token")// res2.sendStatus(500);
            result.json({accessToken:accessToken,refreshToken:refreshToken,isauth:"true"})
        }
    }
    catch(err)
    {   console.log(err);
        res.status(500).send()
    }
} );
async function addRefreshToken (uid,rftoken)
{   console.log("uid refreshtoken")
    const result=await users.updateOne({_id:uid},{
        $set:{
            refresh_token:rftoken
        }
    });  
}
app.get('/token',(req,res)=>{
    const refreshToken=req.body.refreshToken
    const id=req.body.id;
    if(refreshToken==null) return res.sendStatus(401)

    if(ifExists(id,refreshToken))
        console.log("success");
    else console.log("No Success")
     jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,usr)=>{
         if(err) return res.sendStatus(403);
         const accessToken=generateAccessToken(usr)
         res.json({accessToken:accessToken})
     })
   
})

app.post('/logout',authenticateToken,(req,result)=>{
    const question=req.body.question
    const desc=req.body.desc;
    const userid=req.user.id
    console.log(req.user.id)
    const q=`update user set lastlog =now() where userid=${req.user.id};`;
    dbcon.query(q,(err,res)=>{
        if(err)
            console.log(err)
        else
        {
            result.sendStatus(200);
        }
    })
})

app.post('/cmnt',(req,result)=>{
    const id=req.body.id;
    const q=`select u.username,a.answer from answer a,question q,user u where (a.qid=q.qid) and a.uid=u.userid and q.qid=${req.body.id};`
dbcon.query(q,(err,res)=>{
    if(err) console.log(err)
    else
    {   
        result.json(res)
    }
})

    



})
app.get('/feed',(req,result)=>{
    const id=req.body.id;
    const q=`SELECT q.qid,u.name,q.question,q.qdescription FROM qna.question q, qna.user u where q.userid=u.userid order by q.dt desc;`;
    dbcon.query(q,async (err,res)=>{ 
        if(err)
        {
            console.log(err)
        }
        else{

            console.log(res);
            result.json(res);
        }
    })




})
async function ifExists(uid,token)
{

    if(token==user.refresh_token)
        return 1;
    return 0;

}
function generateAccessToken(user)
{
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:60*60*5});
}

app.post('/user',(req,result)=>{
const name=req.body.name;
const q=`  SELECT u.userid,u.name,u.description,email,github,instagram,website,facebook FROM qna.user u where u.name like "%${name}%" limit 1 `;
dbcon.query(q,(err,res)=>{
    if(err) console.log(err);
    else{
        result.json(res)
    }
})
})

app.post('/userinfo',authenticateToken,async (req,result)=>{
    
    const id=req.user.id;
    const user = await users.findOne({ _id: id });
    result.join(user);

    })

app.post('/getprojects',(req,result)=>{
    const id=req.body.userid;
    const q=`select * from projects where uid=${id};`
    dbcon.query(q,(err,res)=>{
        if(err)
        console.log(err)

        else{
            result.json(res)
        }

    })
})
app.post('/comment',authenticateToken,(req,result)=>{
    const postid=req.body.postid;
    const comment=req.body.comment;
    const userid=req.user.id;
    const q='INSERT INTO `qna`.`answer` (`answer`, `qid`, `uid`) VALUES (\''+comment+'\', '+postid+', '+userid+');';
    dbcon.query(q,(err,res)=>{
        if(err)
            console.log(err)
        else
        {   console.log("answer posted")
            result.sendStatus(200);
        }
    })


})

app.post('/project',authenticateToken,(req,result)=>{
    const name=req.body.name;
    const description=req.body.description;
    const userid=req.user.id;
    const skills=req.body.skills
    const q='INSERT INTO `qna`.`projects` (`name`, `description`, `skills`, `uid`) VALUES (\''+name+'\', \''+description+'\', \''+skills+'\', '+userid+');';
    dbcon.query(q,(err,res)=>{
        if(err)
            console.log(err)
        else
        {   console.log("project posted")
            result.sendStatus(200);
        }
    })
})
// POST PROJECTS
app.post('/projects',(req,result)=>{

    const q='select p.*,s.name as oname from projects p,user s where p.uid=s.userid order by p.time desc;';
    dbcon.query(q,(err,res)=>{
        if(err)
            console.log(err)
        else
        {   
            // console.log("project posted")
            result.json(res)
        }
    })
})

app.post('/projectresponse',authenticateToken,(req,result)=>{

    const userid=req.user.id;
    const projectid=req.body.projectid
    // console.log(req.body)
    const q='INSERT INTO `qna`.`project_response` (`projectid`, `userid`) VALUES ('+projectid+', '+userid+');';
    dbcon.query(q,(err,res)=>{
        if(err)
            console.log(err)
        else
        {   
            console.log("project posted")
            result.sendStatus(200);
        }
    })
})
app.post('/getprojectresponse',authenticateToken,(req,result)=>{

    // console.log("get project response")
    const q=`select p.projectid ,u.name,ps.name as pname from project_response p,projects ps, user u where ps.id=p.projectid and p.userid=u.userid and p.projectid in (select p.id from projects p ,user u where p.uid=u.userid and u.userid=${req.user.id}) order by p.time desc;`;
    dbcon.query(q,(err,res)=>{
        if(err)
            console.log(err)
        else
        {   
            // console.log("sent")
            result.json(res);
        }
    })
})


app.post('/question',authenticateToken,(req,result)=>{
    const question=req.body.question
    const desc=req.body.desc;
    const userid=req.user.id
    console.log(userid+" "+question)
    const q="INSERT INTO `qna`.`question` (`userid`, `question`,`qdescription`) VALUES (\""+userid+"\", \""+question+"\",\""+desc+"\");";
    dbcon.query(q,(err,res)=>{
        if(err)
            console.log(err)
        else
        {
            result.sendStatus(200);
        }
    })
})
function authenticateToken (req,res,next)
{  

    const authHeader=req.body['authorization']

    const token=authHeader && authHeader.split(' ')[1]
    if(token==null)
    {
        return res.sendStatus(401); 
    }
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) return res.sendStatus(403)
        req.user=user
        next()
    })
}
// app.
app.listen(port,()=>{
    console.log(`Server started at port :${port}`)
});
}


main();