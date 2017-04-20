'use strict';

/*Start of the import block*/
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../db/users');
var config = require('../config/main');
/*End of the import block*/

/*Setup work and export for the JWT passport strategy*/
module.exports = function (passport) {
    var opts = {
        jwtFromRequest: ExtractJwt.fromHeader("authorization"),
        secretOrKey: config.secret
    };
    passport.use(new JwtStrategy(opts, function (jwt_payload, callback) {
        User.findUser({email: jwt_payload.user_email}, function (res) {
            var user = res;
            delete user.password;
            callback(null, user);
        }, function (err) {
            return callback(err, false);
        });
    }));
};