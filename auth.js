import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

module.exports = app => {
  const User = app.db.models.User;
  const config = app.config;
  const params = {
    secretOrKey: config.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
  };

  const strategy = new Strategy(params, (payload, done) => {
    User.findById(payload.id)
      .then(user => {
        if (user) {
          return done(null, user);
        }

        return done(null, false);
      })
      .catch(err => done(err, null));
  });

  passport.use(strategy);

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  return {
    init: () => {
      return passport.initialize();
    },
    authenticate: () => {
      return passport.authenticate('jwt', config.secret);
    },
  };
};
