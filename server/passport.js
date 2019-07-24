require("dotenv").config();
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const LocalStrategy = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require("passport-google-plus-token");
const FacebookTokenStrategy = require('passport-facebook-token');
const { SECRET_KEY, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, FACEBOOK_CLIENT_ID,FACEBOOK_CLIENT_SECRET} = process.env;
const User = require("./models/user");

// Json Web Tokens Strategy
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: SECRET_KEY
}, async (payload, done) => {
    try {
        // Find the user specified in token
        const user = await User.findById(payload.sub);

        //If user doesn't exists, handle it
        if (!user) {
            return done(null, false);
        }

        //Otherwise, return the user
        done(null, user);
    } catch (error) {
        done(error, false)
    }
}))

// Facebook oauth Strategy
passport.use('facebookToken', new FacebookTokenStrategy({
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret : FACEBOOK_CLIENT_SECRET
}, async(accessToken, refreshToken, profile, done) =>{
    try{
        console.log("accessToken", accessToken);
        console.log("refreshToken", refreshToken);
        console.log("profile", profile);
        // check whether user exist
        const existingUser = await User.findOne({"facebook.id": profile.id});
        if(existingUser){
            return done(null, existingUser)
        }
        //if it is new account
        const newUser = new User({
            method: "facebook",
            facebook :{
                id:profile.id,
                email:profile.emails[0].value
            }
        });

        await newUser.save();
        done(null, newUser);
    }catch(error){
        done(error, false, error.message)
    }
}))

// Google oauth Strategy

passport.use("googleToken", new GooglePlusTokenStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET
}, async (accessToken, refreshToken, profile, done) => {

    try {
        console.log("accessToken", accessToken);
        console.log("refreshToken", refreshToken);
        console.log("profile", profile);

        // Check whether user exist
        const existingUser = await User.findOne({ "google.id": profile.id });
        if (existingUser) {
            console.log("User exists")
            return done(null, existingUser)
        }

        // if it is new account
        const newUser = new User({
            method: "google",
            google: {
                id: profile.id,
                email: profile.emails[0].value
            }
        });

        await newUser.save();
        done(null, newUser)
    } catch(error){
        done(error, false, error.message);
    }
    
}))

//Local Strategy
passport.use(new LocalStrategy({
    usernameField: "email"
}, async (email, password, done) => {
    try {
        // Find the user given the email
        const user = await User.findOne({ "local.email": email });

        // if not, handle it
        if (!user) {
            return done(null, false);
        }

        // Check if the password is correct
        const isMatch = await user.isValidPassword(password);
        if (!isMatch) {
            return done(null, false);
        }
        //Otherwise
        done(null, user);
    } catch (error) {
        done(error, false)
    }

}))