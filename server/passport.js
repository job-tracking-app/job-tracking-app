require("dotenv").config();
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const {ExtractJwt} = require("passport-jwt");
const LocalStrategy = require('passport-local').Strategy;
const {SECRET_KEY} = process.env;
const User = require("./models/user");

// Json Web Tokens Strategy
passport.use( new JwtStrategy({
    jwtFromRequest : ExtractJwt.fromHeader("authorization"),
    secretOrKey: SECRET_KEY
}, async(payload, done) => {
    try{
        // Find the user specified in token
        const user = await User.findById(payload.sub);

        //If user doesn't exists, handle it
        if(!user){
            return done(null, false);
        }

        //Otherwise, return the user
        done(null, user);
    }catch(error){
        done(error, false)
    }
}))


//Local Strategy
passport.use(new LocalStrategy({
 usernameField: "email"   
}, async (email, password, done) => {
    try{
        // Find the user given the email
        const user = await User.findOne({email});

        // if not, handle it
        if(!user){
            return done(null, false);
        }

        // Check if the password is correct
        const  isMatch =  await user.isValidPassword(password);
        if(!isMatch){
        return done(null, false);
        }
        //Otherwise
        done(null,user);
    } catch(error){
        done(error, false)
    }
    
}))