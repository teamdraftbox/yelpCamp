var Campsite = require("../models/campsite")
var Comments = require("../models/comments")


var middleware = {
  isLoggedIn :  function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","login to access")
    res.redirect("back")
},

isowner:function (req,res,next){
    if(req.isAuthenticated()){
        Campsite.findById(req.params.id,function(err,found){
            if(err || !found){
                req.flash("error","webpage not found")
                res.redirect("back")}else{
                if(found.author.id.equals(req.user._id)){
                    return next();
                }else{
                    console.log("you are not authorized to edit")
                    req.flash("error","unautherized to perform function")
                    res.redirect("back")
                }
            }
        })
    }else{
        req.flash("error","login to access")
        res.redirect("/login")
    }
},


isOwner:function(req,res,next){
    if(req.isAuthenticated()){
        Campsite.findById(req.params.id,function(err, found) {
            if(err || !found){
                req.flash("error","webpagenot found")
                res.redirect("back")
            }else{
                Comments.findById(req.params.comments_id,function(err,comment){
            if(err || !comment){
                req.flash("error","webpage not found")
                res.redirect("back")}else{
                if(comment.author.id.equals(req.user._id)){
                    return next()
                }else{
                    req.flash("error","unautherized to perform function")
                    res.redirect("back")
                }
            }
        })
            }
        })
        
    }else{
        res.redirect("/login")
    }
}
}

module.exports = middleware

