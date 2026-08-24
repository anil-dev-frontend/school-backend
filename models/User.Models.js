const mongoose = reqiure("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        reqiured:true,
    },
    email:{
        type:String,
        reqiured:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    }
});
module.exports = mongoose.model("user",userSchema)