var express = require("express"),
app = express.Router({mergeParams:true}),
Campsite = require("../models/campsite"),
Comments = require("../models/comments"),
middle= require("../middleware/middle")
//========================COMMENTS NESTED ROUTES=====================//

app.get("/campsite/:id/comments/new",middle.isLoggedIn,function(req,res){
   Campsite.findById(req.params.id,function(err,id){
       if(err){console.log("error")}else{
           res.render("commentform",{id:id})
       }
   })
    
})

app.post("/campsite/:id/comments",middle.isLoggedIn,function(req,res){
    Campsite.findById(req.params.id,function(err,campground){
        if(err){console.log("error")}else{
            Comments.create(req.body.comment,function(err,comment){
                if(err){console.log("error")}else{
                    comment.author = {id:req.user._id,username: req.user.username}
                
               //save comment
               comment.save();
               campground.comments.push(comment);
               campground.save();
               console.log(comment);
               res.redirect('/campsite/' + campground._id);
                    
                }
            })
        }
    })
})

//edit comments//
app.get("/campsite/:id/comments/:comments_id/edit",middle.isOwner,function(req,res){
    Comments.findById(req.params.comments_id,function(err,comment){
        console.log(req.params.id)
        console.log(req.params.comments_id)
        if(err || !comment){
            req.flash("error","web page not found")
            res.redirect("back")
        }else{
             res.render("commentedit",{id:req.params.id,comment:comment})
        }
    })
   
})
app.put("/campsite/:id/comments/:comments_id",middle.isOwner,function(req,res){
    Comments.findByIdAndUpdate(req.params.comments_id,req.body.comment,function(err,body){
        if(err){}else{
            res.redirect("/campsite/" + req.params.id)
        }
    })
})

app.delete("/campsite/:id/comments/:comments_id",middle.isOwner,function(req,res){
 Comments.findByIdAndRemove(req.params.comments_id,function(err){
     if(err){}else{
         res.redirect("/campsite/" + req.params.id)
     }
 })
    
})


module.exports = app