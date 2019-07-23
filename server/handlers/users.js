require("dotenv").config();
const JWT = require("jsonwebtoken");
const User = require("../models/user.js");
const {SECRET_KEY} =process.env;

signToken = user => {
    return JWT.sign({
        sub: user.id,
        iat: Date.now () / 1000, // current time
        exp: Math.floor (Date.now () / 1000) + ((60 * 60)*24) // current time + 1 day ahead
    }, SECRET_KEY);    
}
module.exports = {
    signUp: async (req,res,next) => {
       console.log("hit")
      const {email, password} = req.value.body;
      //Check if user exists
      const foundUser = await User.findOne({email});
      if(foundUser){
       return res.status(409).json({error: "Email already in use"})
      }
      // Create a new user
      const newUser = new User({
          email,
          password
      });
      await newUser.save();

      //Generate the token
      const token = signToken(newUser)

      //Respond with token
      res.status(200).json({token})
      
    },
    signIn: async (req,res,next) => {
        const token = signToken(req.user);
        res.status(200).json({token});
    },
    secret: async (req,res,next) => {
        console.log("Center hit")
        res.json({secret : "resource"})
        
    }
}