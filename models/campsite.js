var mongoose = require("mongoose")
var campsiteSchema = new mongoose.Schema({
    site:String,image:String,discription:String,price:Number,
    author:{id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
    },
            username:String
    },
    
    comments:[{type:mongoose.Schema.Types.ObjectId,
           ref:"Comments"//comments model name
    }]
})

module.exports = mongoose.model("Campsite",campsiteSchema)