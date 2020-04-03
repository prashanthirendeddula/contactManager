const express=require('express')
const app=express()
const port=3500
const dbsetup=require('./config/database')
const router=require('./app/controllers/userscontroller')
const {contactrouter}=require('./app/controllers/contactscontroller')
//dbsetup
dbsetup()
//middleware
app.use(express.json())
app.use('/users',router)
app.use('/contacts',contactrouter)
app.listen(port,()=>{
    console.log('listening on port',port)
})