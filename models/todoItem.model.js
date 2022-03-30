const mongoose = require('mongoose');
const User = require('../models/users.model')



const todoListSchema = new mongoose.Schema({
    title : {type: String, required : true},
    desc : {type: String, required : true},
    status : {type: Boolean, required : true, default : false},
    user : {type : mongoose.Schema.Types.ObjectId, ref : User }
},{
    timestamps : true
})

module.exports =  mongoose.model("todoItems", todoListSchema);