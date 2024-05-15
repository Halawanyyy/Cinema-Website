const express=require("express")
require("dotenv").config();
const app=express()
const DB=require("./Config/DB")
const bodyParser = require('body-parser');
const userHandler=require("./Routes/UserHandler")
const movieHandler=require("./Routes/MovieHandler")
const adminHandler=require("./Routes/AdminHandler")
app.use(bodyParser.json());
app.use('/user',userHandler)
app.use('/movie',movieHandler)
app.use('/admin',adminHandler)
app.listen(process.env.PORT,()=>{
    console.log("200")
})