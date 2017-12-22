const router = require('express').Router();
const AuthController = require('./app/endpoints/auth');
const UserController = require('./app/endpoints/user');

router.use('/auth', AuthController);
router.use('/user', UserController);

module.exports = router;
