const mongoose = require('mongoose')

const formSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

const Model = mongoose.model('model', formSchema)
module.exports = Model;