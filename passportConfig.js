const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
exports.initializingPassport = (passport) => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (username, password, done) => {
        try {
            const user = await User.findOne({ email: username });
            if (!user) return done(null, false);
            if (user.password != password) return done(null, false);
            return done(null, user);
        }
        catch (error) {
            return done(null, false);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    })

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById({ _id: id });
            done(null, user);
        } catch (err) {
            done(null, false);
        }
    })
}

