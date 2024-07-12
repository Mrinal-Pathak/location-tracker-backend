const mongoose=require('mongoose');
const {Schema}=mongoose

const locationSchema = new Schema({
    ip:{
        type:String,
        required:true,
    },
    
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model('serverTest',locationSchema);