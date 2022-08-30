const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../authentication/models/User');

module.exports = function(passport){
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken,profile,done)=>{
        let date = new Date();
        let currentDate = new Date();
        currentDate.setDate(currentDate.getDate());
        date.setDate(date.getDate() + 30);
        const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value,
        lastLogin: currentDate,
        lastExtention: date
    }
    try{
        let user = await User.findOne({
            where:{googleId: profile.id }})
        if(user){
            user.update({lastLogin : currentDate,})
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
