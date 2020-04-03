const mongoose=require('mongoose')
const Schema=mongoose.Schema
const validator=require('validator')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        minlength:4
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:function(value){
              return  validator.isEmail(value)
            },
            message:function(err){
                return 'invalid email'
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        maxlength:128
    },
    tokens:[
        {
            token:{
                type:String
            },
            createdAt:{
                type:Date,
                default:Date.now
            }
        }
    ]
})
userSchema.pre('save',function(next){
    const user=this
    if(user.isNew){
    bcryptjs.genSalt(10)
         .then(function(salt){
             bcryptjs.hash(user.password,salt)
                 .then(function(encryptedpassword){
                     user.password=encryptedpassword
                     next()
                 })
         })
        }else{
            next()
        }
})
//own static method
userSchema.statics.findByCredentials=function(email,password){
    const User=this
    //check the email id
    
 return   User.findOne({email})
         .then((user)=>{
             if(!user){
                 return Promise.reject('invalid email')
             }
             //compare password
          return   bcryptjs.compare(password,user.password)
                 .then((result)=>{
                     if(result){
                        return Promise.resolve(user)

                     }else{
                        return Promise.reject('invalid password')

                     }
                 })

         })
         .catch((err)=>{
            return Promise.reject(err)
         })

}
//own instance method
userSchema.methods.generateToken=function(){
    const user=this
    const tokenData={
        _id:user._id,
        name:user.username,
        createdAt:Number(new Date())
    }
    const token=jwt.sign(tokenData,'jwt@123')
        user.tokens.push({token:token})
        return user.save()
             .then((user)=>{
                 return Promise.resolve(token)
             })
             .catch((err)=>{
                 return Promise.reject(err)
             })
}
//static method
userSchema.statics.findByToken=function(token){
    const User=this
    let tokenData
    try{
        tokenData= jwt.verify(token,'jwt@123')

    }catch(err){
         return Promise.reject(err)
    }
    return User.findOne({
        _id:tokenData._id,
        'tokens.token':token
    })
}



const User=mongoose.model('User',userSchema)
module.exports=User