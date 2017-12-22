const httpStatusCodes = require('http-status-codes');
const router = require('express').Router();
const authService = require('./service');

router.get('/', (req, res) => res.send('Image Storage API'));

router.post('/signin', (req, res) => {
    authService
        .login(req.body.username, req.body.password)
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.status(httpStatusCodes.UNAUTHORIZED).send(error);
        });
});

router.post('/signup', (req, res) => {
    authService
        .signup(req.body.username, req.body.password)
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.status(httpStatusCodes.BAD_REQUEST).send(error);
        });
});

module.exports = router;
