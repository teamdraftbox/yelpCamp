//======================================installation of utilities======================================//
var express =      require("express"),
app =              express(),
bodyParser =       require("body-parser"),
mongoose =         require("mongoose"),
Campsite =         require("./models/campsite"),
override =         require("method-override"),
Comments =         require("./models/comments"),
seedDB =           require("./seed"),
User   =           require("./models/user.js"),
passport =         require("passport"),
passportlocal =    require("passport-local"),
passportmongoose = require("passport-local-mongoose"),
campsite    =      require("./routes/campsite.js"),
comment=           require("./routes/comments"),
index=             require("./routes/index"),
middle=            require("./middleware/middle"),
flash=             require("connect-flash")


//======================================uitilities setup ==============================================//

app.use(override("_method"))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))
app.set("view engine","ejs")


//seedDB()
app.use(flash())
app.use(require("express-session")({
    secret:"random text input",
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new passportlocal(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
mongoose.connect(process.env.DATABASEURL || "mongodb://localhost/yelpCamp")

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error=req.flash("error");
   res.locals.success=req.flash("success")
   return next();
});
app.use(index)
app.use(comment)
app.use(campsite)
//server starter////////////////////////////////
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("yelp port connected")
})                    