const mongoose = require ('mongoose')
const {model, Schema} = mongoose

const User = new Schema ({
    name: {type: String},
    bio: {type: String},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
},{collation: 'user-data-linktree'})

const userModel = model('userData', User)

module.exports = userModel
