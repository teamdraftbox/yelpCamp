var express = require("express"),
app = express.Router(),
Campsite = require("../models/campsite"),
Comments = require("../models/comments"),
middle = require("../middleware/middle")
//campsite route///////////////////////////////////
app.get("/campsite",function(req,res){
     Campsite.find({},function(err,newcamp){
        if(err){console.log("error occured")}
        else{
             res.render("campsite",{campsite:newcamp})    
        }
    })
       
                    
})

//form page route////////////////////////////////////
app.get("/campsite/add",middle.isLoggedIn,function(req,res){
    res.render("form")
})

//post the data to database///////////////////
app.post("/campsite",middle.isLoggedIn,function(req,res){
    var site = req.body.site
    var url = req.body.url
    var dis = req.body.discription
   var  author = {id:req.user._id,
                 username:req.user.username}
    var obj = {site:site,image:url,discription:dis,author:author,price:req.body.cost}
    
    Campsite.create(obj,function(err,newcamp){
        if(err){
            console.log("error occured")
        } else { 
            console.log(author)
            res.redirect("/campsite")
        }
    })
    
})
// seprate viewing route/////////////////////////
app.get("/campsite/:id",function(req,res){
     
     Campsite.findById(req.params.id).populate("comments").exec(function(err,ops){
        if(err || !ops)
        {console.log("erooor");
            req.flash("error","webpage not found")
            res.redirect("back")
        }else{
            res.render("show",{found:ops})
       }
    })
})
//edit and update the campsite///////////////////
app.get("/campsite/:id/edit", middle.isowner,function(req,res){
    Campsite.findById(req.params.id,function(err,camp){
        if(err || !camp){console.log("error")
            req.flash("error","webpage not found")
        }else{
            res.render("edit",{camp:camp})
        }
    })
})
app.put("/campsite/:id", middle.isowner,function(req,res){
    Campsite.findByIdAndUpdate(req.params.id,req.body.campsite,function(err,body){
        if(err){}else{
            res.redirect("/campsite/" + req.params.id)
        }
        
    })
})
//delete the route/////////////////////////////////////
app.delete("/campsite/:id",middle.isowner,function(req,res){
    Campsite.findByIdAndRemove(req.params.id,function(err,body){
        if(err){console.log("errtor")}else{
            res.redirect("/campsite")
        }
    })
})




module.exports = app

