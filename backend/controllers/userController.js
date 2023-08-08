const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id)=>{
  console.log("id: ",_id);
    return jwt.sign({_id},"sunflowerblue",{expiresIn:'1d'})
}

// login a user
const loginUser = async (req, res) => {
    const {email,password} = req.body
  
    try {
      const user = await User.login(email, password)
  
      // create a token
      const token = createToken(user._id)
  
      res.status(200).json({email, token,AdminToken:user.Token,user})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
}

const getusers = async(req,res) =>{

    User.find({})
    .then(users=>{
        res.status(200).json(users)
    })
    .catch(err=>{
        console.log(err)
        res.status(500)
    })

}

const postuser = async(req,res)=>{
    const {name,email,password,Token} = req.body

    try{
        const user = await User.signup(name,email,password,Token)
        //create token
        const token = createToken(user._id)
        res.status(200).json({email,token})
    } catch(error){
        console.log(error.message);
        res.status(400).json({error: error.message})
    }

    
}


const updateuser = async (req,res)=>{
    const userId = req.params.id;
    const { name, email, password,Token } = req.body;
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.name = name || user.name;
      user.email = email || user.email;
      user.password = password || user.password;
      user.Token = Token
      await user.save();
  
      return res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
}



module.exports = {getusers,postuser,updateuser,loginUser}