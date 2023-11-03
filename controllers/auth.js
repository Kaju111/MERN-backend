const User = require('../models/user')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res)=>{
    const {name, email, password} = req.body;
    console.log(req.body)
    try {
        const user = await User.create({name, email,password})
        const token = jwt.sign({email: email}, process.env.SECRET_JWT)
        console.log('user',user)
        return res.json({message: 'user created', status: 'success', 'token': token, id: user._id})
    } catch (error) {
        if(error.code === '11000'){
            return res.json({message: "Try different name or email", status: 'error'})
        }
        return res.json({message: error.message, status: 'error',})
    }
}
const signinUser = (req, res)=>{
    const {email, password} = req.body;
    try {
        const user = User.findOne({email: email, password: password})
        console.log(user)
        if(!user){
            return res.json({status: 'not found', error: 'Invalid credentials'})
        }
        const token = jwt.sign({email: email}, process.env.SECRET_JWT)
        return res.json({message: 'user found', status: 'success', 'token': token, id: user._id})
    } catch (err) {
        
    }
}

module.exports = {registerUser, signinUser}