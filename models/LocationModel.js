const mongoose=require('mongoose');
const {Schema}=mongoose

const locationSchema = new Schema({
    key:{
        type:Number,
        required:true,
        unique:true
    },
    longitude:{
        type:Number,
        required:true,
    },
    latitude:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model('location',locationSchema);