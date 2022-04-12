const GoogleStrategy = require('passport-google-oauth20').Strategy
const Sequelize = require('sequelize');
const User = require('../authentication/models/User');
const moment = require('moment')

module.exports = function(passport){
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken,profile,done)=>{
        let date = new Date();
        date.setDate(date.getDate() + 30);
        const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        lastExtention: date
    }
    try{
        // let user= await User.findByPk(profile.id)
        let user = await User.findOne({ googleId: profile.id })

        if(user){
            done(null, user)
        } else{
            user = await User.create(newUser)
            done(null,user)
        }
        }catch (err){
            console.error(err)
        }
    }
    ))

    passport.serializeUser(function(user, done) {
    done(null, user);
    });

    passport.deserializeUser(function(user, done) {
    done(null, user);
    });
}
