const mongoose=require('mongoose')
const Schema=mongoose.Schema
const contactSchema=new Schema({
    name:{
        type:String,
        required:true,
        minlength:1
    },
    number:{
        type:String,
        require:true,
        minlength:10,
        maxlength:10
    },
    emailid:{
        type:String,
        
    },
    user:{
        type:Schema.Types.ObjectId,
       required:true,
        ref:"user"
    }
})
const Contact=mongoose.model('Contact',contactSchema)
module.exports=Contact