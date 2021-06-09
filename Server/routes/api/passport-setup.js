const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


passport.serializeUser(function(user, done) {
    /*
    From the user take just the id (to minimize the cookie size) and just pass the id of the user
    to the done callback
    PS: You dont have to do it like this its just usually done like this
    */
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    /*
    Instead of user this function usually recives the id 
    then you use the id to select the user from the db and pass the user obj to the done callback
    PS: You can later access this data in any routes in: req.user
    */
    done(null, user);
});

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: "11999313501-1985s9r48uiqr30k79ogq4do0atm4sfe.apps.googleusercontent.com",
    clientSecret: "k5fYDkc0mJvJZGlkV8WYRuek",
    callbackURL: "http://localhost:5000/google/callback"
  },
   function(accessToken, refreshToken, profile, done) {
       return done(null, profile);
  }
));
