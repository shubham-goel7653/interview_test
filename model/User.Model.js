const mongoose = require('mongoose')
const {Schema} = mongoose


const UserSchema = new Schema({
    _id : String,
    name : { type: String, required: true},
    email : { type: String, required: true},
    password : { type: String, required: true},
    address : { type: String, required: true},
    latitude : { type: String, required: true},
    longitude : { type: String, required: true},
    status : { type: String, default: true},
    token : { type: String, required: true}
},
{
    timestamps: {
        createdAt: "_generated_at",
        updatedAt: "_updated_at"
    },
    versionKey: false
})


const User = mongoose.model('User', UserSchema, 'User');
module.exports = User;