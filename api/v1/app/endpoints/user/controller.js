const passport = require('passport');
const httpStatusCodes = require('http-status-codes');
const router = require('express').Router();
const UserService = require('./service');
const config = require('../../../../config/settings');

router.get('/', passport.authenticate('jwt', config.session), (req, res) => {
    UserService
        .list()
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.status(httpStatusCodes.BAD_REQUEST).send(error);
        });
});

module.exports = router;
