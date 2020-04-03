const express=require('express')
const router=express.Router()
const Contact=require('../models/contact')
const User=require('../models/user')
const {authenticateUser}=require('../middlewares/autenticate')

router.get('/',(req,res)=>{
       Contact.find()
          .then((contact)=>{
              res.json(contact)
          })
          .catch((err)=>{
              res.json(err)
          })
})
router.post('/',authenticateUser,function(req,res){
    const body=req.body
    const contact=new Contact(body)
  //  message.user=req.user._id
    contact.user=req.user._id
    contact.save()
       .then((contact)=>{
           res.json(contact)
       })
       .catch((err)=>{
           res.json(err)
       })

})
router.get('/:id', authenticateUser, (req, res) => {
    const id = req.params.id 
    Contact.findOne({
        _id: id,
        user: req.user._id 
    })
    .then(contact => {
        if(contact) {
            res.json(contact)
        } else {
            res.json({})
        }
    })
})
router.put('/:id',authenticateUser,(req,res)=>{
    const body=req.body
    const id=req.params.id
    Contact.findoneAndUpdate({
        _id:id,
        user:req.user._id,
        
    },body,{new:true})
    .then((contact)=>{
        if(contact){
            res.json(contact)
        }else{
            res.json({})
        }
    })
    
})



module.exports={
    contactrouter:router
}