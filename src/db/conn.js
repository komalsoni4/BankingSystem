/*connection with database*/
const dotenv=require("dotenv");
const mongoose= require('mongoose');
const Colection=require("../models/list");

dotenv.config({path:'Banking-System-main/src/.env'});

const DB=process.env.DATABASE  
mongoose.connect(DB).then(() =>{
    console.log("Connection successful");
}).catch((e)=>{
   console.log("No connection");
   console.log(e);
})