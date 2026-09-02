const mongoose=require("mongoose");
const schema= mongoose.Schema

const userSchema= new schema({
    first_name:{
        type: String
    },
    last_name:{
        type: String
    },
    email:{
        type: String
    },
    password:{
        type: String
    },
    past_orders: [{
        items: [{
            id: {
                type: String,
                required: true
            },
            name:{
                type: String,
                required: true
            },
            price:{
                type: Number,
                required: true
            },
            image:{
                type: String,
                required: true
            },
            qty: {
                type: Number,
                required: true
            }
        }],
        totalPrice: Number,
        date: {
            type: Date,
            default: Date.now
        }
    }]

},{timestamps:true})

const User=mongoose.model('User', userSchema)
module.exports = User
