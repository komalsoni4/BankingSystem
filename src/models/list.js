
const express=require("express");
const mongoose = require("mongoose");

const listSchema = mongoose.Schema({
    

        name:{
            type:String,
        }, 
        email:{
            type:String,
        }, 
        amount:{
            type:Number,
        }, 
        password:{
            type:String,
        }, 
        confirmpassword:{
            type:String,
        }, 
        history:[
            {
                text:{
                    
                        type:String,
                    
                }
            }
        ],
    

})

module.exports=mongoose.model("Customer",listSchema);