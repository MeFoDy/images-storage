const config = require('./settings');
const passportJwt = require('passport-jwt');
const { ExtractJwt, Strategy } = passportJwt;
const UserRepository = require('../v1/app/endpoints/user/repository');

const init = (passport) => {
    const params = {
        secretOrKey: config.secret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    };

    passport.use(new Strategy(params, (payload, done) => {
        UserRepository
            .findById(payload.id)
            .then(user => {
                if (user) done(null, user);
                else done(null, false);
            })
            .catch(error => {
                if (error) return done(error, false);
            });
    }));
};

module.exports = init;
