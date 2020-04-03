const express=require('express')
const router=express.Router()
const User=require('../models/user')
router.post('/register',(req,res)=>{
    const body=req.body
    const user=new User(body)
    user.save()
        .then((user)=>{
            res.json(user)
        })
        .catch((err)=>{
            res.json(err)
        })
})
router.post('/login',(req,res)=>{
    const body=req.body
    User.findByCredentials(body.email,body.password)
         .then((user)=>{
             return user.generateToken()
                 .then((token)=>{
                     res.setHeader('x-auth',token).send({})
                 })
         })
         .catch((err)=>{
             res.send(err)
         })

  
})
///account
router.get('/account',(req,res)=>{
    const token=req.header('x-auth')
    if(token){
        res.send('success')
    }else{
        res.send('failure')
    }
})
module.exports=router