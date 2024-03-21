
const passport = require('passport');
const {Strategy, ExtractJwt} = require('passport-jwt');
const user = require('../models/model');



const jwt_secret = "##%dasdsadasd##";


const strategy = new Strategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwt_secret
    },
    (payload, done) => {
        try {
            user.findById({userid: payload._id}, (err, user) => {
                if(!user) {
                    const error = new Error("User not found")
                    console.log(error)
                }
                else if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
                
            });
        } catch (error) {
            done(error);
        }
       
    }
);


passport.use(strategy);

const initialize = ()=>{
    return passport.initialize();
};

const authenticate = ()=>{
    return passport.authenticate('jwt', {session: false});
};

module.exports = {
    initialize,
    authenticate
};













































