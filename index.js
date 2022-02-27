const express=require('express')
const dbcon =require('./config');
const comment=require('./models/answer')
require("dotenv").config('.env');
const { connectMongoDB } = require("./Database/database");
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt=require('bcrypt');
const AuthRoute=require('./routes/AuthRoute')
const main = async () => {
    const app = express();
    const port = process.env.PORT || 8000;
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    connectMongoDB();
    app.use(express.json());
    app.use(express.urlencoded({extended: true,}));

    app.use('/api',AuthRoute);

    app.use(cors({origin: 'http://localhost:3000'}));
    app.listen(port,()=>{
        console.log(`Server started at port :${port}`)
    });
}
main();