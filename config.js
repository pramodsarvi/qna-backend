const mysql=require('mysql');
require("dotenv").config('.env');

const dbConn=mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
});
dbConn.connect((error)=>{
    console.log(process.env.HOST)
    if(error)
    throw error;

    console.log("Database Connection successful");
});

module.exports=dbConn;