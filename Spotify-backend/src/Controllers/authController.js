const User = require('../models/user');
const {hashpassword,comparepassword}=require('../helpers/auth')
const jwt=require('jsonwebtoken')
const test = (req, res) => {
    res.json('test is working');
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if name is present
        if (!name) {
            return res.json({ error: "Name is required" });
        }

        // Check for password
        if (!password || password.length < 6) {
            return res.json({ error: "Password is required with the strength of 6 characters at least" });
        }

        // Check email
        const exist = await User.findOne({ email });
        if (exist) {
            return res.json({ error: "Email is already taken" });
        }
        const hashedpassword=await hashpassword(password);
        const user = await User.create({ 
            name, 
            email,
            password:hashedpassword,
         });
        return res.json(user);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;

        //check email
        const user=await User.findOne({email})
        if(!user){
            return res.json({
                error:"User Not Found"
            })
        }
        const match=await comparepassword(password,user.password)
        if(match){
        jwt.sign({email:user.email, id:user._id, name:user.name}, process.env.JWT_SECRET,{}, (err,token)=>{
            if(err) throw err;
            res.cookie('token',token).json(user);
        })
        }
        if(!match){
            return res.json({
                error:"Passwords do not Match"
            })
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
const profilesetter=(req,res)=>{
    const {token}=req.cookies;
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,{}, (err,user)=>{
            if(err) throw err;
            res.json(user)
        })
    }
    else{
        return res.json(null)
    }
}

module.exports = {
    test,
    registerUser,
    loginUser,
    profilesetter,
};
