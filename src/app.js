const express = require("express");
const mongoose=require("mongoose");
const path =require("path");
const app = express();
const hbs=require("hbs");
const {registerPartials}=require("hbs")
require("dotenv").config();
require("./db/conn")
const Clist=require("../src/models/list");
const router=require("./routers/main")


const port = process.env.PORT || 3003;


const templatepath=path.join(__dirname,"../templates/views");
const partialepath=path.join(__dirname,"../templates/partials");

app.use(express.urlencoded({extended:false}))
app.use("",router);



app.use("/static",express.static("public"))
app.use(express.json());



app.set("view engine" ,"hbs")
app.set("views",templatepath);
hbs.registerPartials(partialepath);
app.listen(port,()=>{
    console.log(`connection is live at port no. ${port}`);
})