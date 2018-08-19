var express = require("express"),
app = express.Router(),
User = require("../models/user"),
passport = require("passport")



//=============================================routes creation==========================================//
                     
//main page route//////////////////////////////////               
                     
app.get("/",function(req,res){
   
    res.render("home")
})



//=======================authentication to yelpcamp=======================//

app.get("/register",function(req, res) {
    res.render("register")
})

app.post("/register",function(req, res) {
    User.register(new User({username:req.body.username}),req.body.password,function(err,dat){
        if(err){console.log("error at register");
                req.flash("error",err.message)
               res.redirect("/register")}
        else{
            passport.authenticate("local")(req,res,function(){
                req.flash("success","logged in successfully")
                res.redirect("/campsite")
            })
        }
    })
})

//login get post routes/////////////////////////////////////////////
app.get("/login",function(req, res) {
    
    res.render("login")
})
app.post("/login",
passport.authenticate("local",{
    successRedirect:"/campsite",
    failureRedirect:"/login"})
,function(req,res){

})
//logout routes///////////////////////////////////////////////////
app.get("/logout",function(req, res) {
    req.logout()
    req.flash("success","logged out sucessfully")
    res.redirect("/")
})


module.exports = app