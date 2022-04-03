const user=require('../models/user')
const dbcon =require('../config');
const jwt =require('jsonwebtoken');
const mongoose=require('mongoose')
require("dotenv").config('.env');
const upload_file =require('../file_uploads/multer')
const cors = require('cors');
const users=require('../models/user');
const question=require('../models/question')
const project = require('../models/project');

// const user=require('../models/user')

exports.register= async(req,res)=>{
    try
    {   
        console.log(';ogin')
        // const hashedPassword= await bcrypt.hash(req.body.password,10);
        try{
            // validate all fields
            console.log(req.body)
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
            res.status(200).send(data);
        }
        catch(error)
        {
                console.log(error)
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
}


exports.login=async (req,result)=>{
    try
    {  
        console.log(req.body)
        const user = await users.findOne({ name: req.body.username});
       if(user===null)
        {   
            result.status(404).send();
        }
        else{
            
        let user1={'name':user.name,'userid':user.userid,'password':user.password,'description':user.description,'email':user.email,'website':user.website,'logout':user.lastlog}
        if (req.body.password==user.password)
        {   
            console.log('Valid')
            // console.log(process.env.REFRESH_TOKEN_SECRET)
            const refreshToken=jwt.sign(user1,process.env.REFRESH_TOKEN_SECRET,{expiresIn:'30m'})
            user2={'id':user.userid,'description':user.description,'lastlog':user.logout}
            const accessToken=generateAccessToken(user2)
            if((await addRefreshToken(user.userid,refreshToken)))
                console.log("Could not add refresh token")// res2.sendStatus(500);
            console.log("*******Login***********")
            console.log(accessToken)
            result.json({accessToken:accessToken,refreshToken:refreshToken,isauth:"true"})
        }
        }
       
    }
    catch(err)
    {   console.log(err);
        res.status(500).send('err')
    }
}
async function addRefreshToken (uid,rftoken)
{   console.log("uid refreshtoken")
    const result=await users.updateOne({userid:uid},{
        $set:{
            refresh_token:rftoken
        }
    });  
}
exports.token= async (res,req)=>{
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
}
exports.logout=(req,res)=>{
    const question=req.body.question
    const desc=req.body.desc;
    const userid=req.user.id
    
    const user= users.updateOne({userid:userid},{
        $set:{
            last_log:Date.now()
        }
    })

    result.sendStatus(200)
}
exports.comment=async (req,res)=>{
    const id=req.body.id;
    const q=`select u.username,a.answer from answer a,question q,user u where (a.qid=q.qid) and a.uid=u.userid and q.qid=${req.body.id};`
dbcon.query(q,(err,res)=>{
    if(err) console.log(err)
    else
    {   
        result.json(res)
    }
})
}
async function ifExists(uid,token)
{

    if(token==user.refresh_token)
        return 1;
    return 0;

}
function generateAccessToken(user)
{
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'7d'});
}

exports.feed= async (req,res)=>{
    const a= await user.findOne({userid:req.body.userid});
    res.json({message:"OK",message:"ok"}).send()
}

exports.user= async (req,res)=>{
    // const name=req.body.name;
    const results=await users.find({$text:{$search:req.body.name}});
    console.log(results[0])
    return res.json({data:results}).send()

}
exports.userinfo=async (req,res)=>{
     // const id=req.user.id;
    //  console.log(req.user)
     const user = await users.findOne({ userid: req.user.id });
    //  console.log(user)
     res.status(200).json({data:user});
}
exports.getprojects=async (req,res)=>{
    
    const results=await project.find({$text:{$search:req.body.search}})
    for(var i=0;i<results.length;i++)
    {
        var username=await user.find({userid:results[i].user_id})
        results[i].username=username[0].name;
        // console.log(results[i].username)
    }
    // console.log(results) 
    return res.json({data:results}).send();
    
}
exports.getmyprojects=async (req,res)=>{
    const results=await project.find({userid:req.user.id});
    return res.json({data:results}).send();
    
}


exports.postcomment=async (req,res)=>{
    const postid=req.body.postid;
    const cmnt=req.body.comment;
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
    const commensavet= new comment({answer:cmnt,useruserid:userid}).save();
    // console.log(commensavet)


}
exports.postproject=async (req,res)=>{
    const name=req.body.title;
    const description=req.body.description;
    const userid=req.user.id;
    const skills=req.body.skills;
// console.log(req.body);
    const newproject= new project({title:name,github:req.body.github,skills:skills,user_id:userid}).save();
    res.status(200).send(newproject)
    
}
exports.question=async (req,res)=>{
    const quest=req.body.question
    const desc=req.body.desc;
    const userid=req.user.id
    // console.log(userid+" "+question)

    // const q="INSERT INTO `qna`.`question` (`userid`, `question`,`qdescription`) VALUES (\""+userid+"\", \""+question+"\",\""+desc+"\");";
    // dbcon.query(q,(err,res)=>{
    //     if(err)
    //         console.log(err)
    //     else
    //     {
    //         result.sendStatus(200);
    //     }
    // })
    // // const newquestion=

    const newquestion=new question({user_id:userid,question:quest,question_description:desc}).save();
    result.json(newquestion)
}

exports.projectresponse=async (req,res)=>{
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
}
exports.getprojectresponse=async (req,res)=>{
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
}
exports.updateprofile=async (req,res)=>{
    console.log("get project response")
    console.log(req.body)
    const name= req.body.name;
  const email= req.body.email;
  const description= req.body.description;
  const github=req.body.github;
  console.log(req.user.id)
  const data= await user.updateOne({userid:req.user.id},
    {
        $set:{
            name:name,
            email:String(email),
            description:description,
            github:String(github)
        }
    });
    console.log(data)
}
exports.deleteproject=async (req,res)=>{
    console.log("Delete")
    console.log(req.body)
   console.log(req.user.id)
   const id= mongoose.Types.ObjectId(req.body.id)
  const data= await project.deleteOne({"_id":req.body.projectid});
    console.log(data)
}

exports.upload=async (req,res)=>{
    console.log("UPLOAD")
    console.log(req.user)
    console.log(req.file)
   
}