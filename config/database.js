const mongoose=require('mongoose')
const dbsetup=()=>{
    mongoose.connect('mongodb://localhost:27017/nov-contactmanager')
            .then(()=>{
                console.log('connected to db')
            })
            .catch(()=>{
                console.log(err)
            })
}
module.exports=dbsetup