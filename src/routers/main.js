/*get post patch method yha call hota hai aur router export hota hai*/ 

const express = require("express");
const {route }=require("express/lib/application")
const router =new express.Router();
const Colection=require("../models/list");




router.get("/", async (request,response)=>{
    // console.log("get chala")
   response.render("index")
 })

router.get("/viewl",async (req,res)=>
{
    const details=await Colection.find();
//    console.log(details)
    res.render("viewl",{
        details:details 
    })
  
})
router.get("/about", async(req,res)=>
{
    res.render("about")
})
router.get("/customer",async (req,res)=>
{
    const details=await Colection.find();
//    console.log(details)
    res.render("customer",{
        details:details 
    })
})
router.get("/profile",async (req,res)=>
{
    const details=await Colection()
   
    res.render("profile",{
        details:details 
    })
})

router.get("/login",async(req,res)=>{

    res.render("login")
})

router.get("/register",async(req,res)=>{
     res.render("register")
})


router.get("/history/:id", async (req,response)=>{


    Colection.findById(req.params.id,(err,doc)=>{
        // console.log(doc.history);
        if(!err){
            response.render("history",{details:doc})
        }
        else{
            console.log(err)
        }
    })
  
 })

 
router.get("/trans/:id", async (req,response)=>{
   // const overalldetail=await Colection.find();
   Colection.findOneAndUpdate({_id:req.params.id},req.body,{new:true},(err,docs)=>{
    if(err){
        console.log("can't update");
    }else{
        response.render("trans",{details:docs})
    } 
   }) 

 })


 router.post("/trans/:id",async(req,res)=>{
    const emailR=req.body.receiver;
    const amountT=req.body.amount;
    const emailS=req.body.email;
    console.log(emailS);
   Colection.findOne({"email":emailS},function(err,result){
    if(!err && result){
       
        var a=result.amount;
       result.amount=a-amountT;
       result.history=[{text:(`Rs ${amountT} successsfully sent to ${emailR}`)}];
        var colection=new Colection(result);
        colection.save(function(err,result2){
            if(!err){
                res.redirect("/customer")
            }else res.send(err);
        })
    } else res.send(err);
   })

   Colection.findOne({"email":emailR},function(err,result){
    if(!err && result){
       
        var a=result.amount;
       result.amount=a+amountT;
       result.history=[{text:(`Rs ${amountT} successsfully received by ${emailS} `)}];
        var colection=new Colection(result);
        colection.save(function(err,result2){
            if(!err){
               console.log("UPdated")
            }else res.send(err);
        })
    } else res.send(err);
   })
 
 })

router.post("/login",async(req,res)=>{
  const password=req.body.password;
  const email=req.body.email;
  if(!email || !password)
{
 res.send("Please Enter Value")
 }
  const details=await Colection.findOne({email}).select("password");
  if(!details){
    res.send("Please enter password")
  }
  console.log(details.password)
//const isPasswordMatched=details.comparePassword(password);
  if(details.password!=password){
         res.send("Password didnot matched")
  }
  else{
  //  alert("Logged In")
    console.log("loggedIn")
    res.redirect("/");
  }

})


router.post('/register',function (req, res)
    {

        const password=req.body.password;
        const cpassword=req.body.cpassword;
        if(password!=cpassword)
        {
            res.send("Password not matching");
        }
        var details = new Colection();

        details.name = req.body.name;
        details.email = req.body.email;
        details.amount = req.body.amount;
        details.password = req.body.password;

        details.save(function(err)
        {
            if (err)
            {
                res.send(err);
            }
            else{console.log('Created');
            res.redirect('/');
        }
        });
        console.log(details)
    });

module.exports = router;