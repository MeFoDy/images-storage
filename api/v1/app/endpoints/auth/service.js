const jsonwebtoken = require('jsonwebtoken');
const UserRepository = require('../user/repository');
const config = require('../../../../config/settings');

const login = (username, password) => new Promise((resolve, reject) => {
    UserRepository
        .findByUsername(username)
        .then(user => {
            if (!user) {
                return reject({
                    success: false,
                    message: 'Authentication failed. User not found.',
                });
            }
            user.comparePassword(password, (error, matches) => {
                if (matches && !error) {
                    const token = jsonwebtoken.sign({ user }, config.secret);
                    return resolve({
                        succes: true,
                        message: 'Token granted',
                        token,
                        user,
                    });
                }
                reject({
                    success: false,
                    message: 'Authentication failed. Wrong password',
                });
            });
        })
        .catch(error => {
            reject(error);
        });
});

const signup = (username, password) => new Promise((resolve, reject) => {
    if (!username || !password) {
        return reject({
            success: false,
            message: 'Please, pass a username and password.',
        });
    }
    UserRepository
        .createNew({
            username: username,
            password: password,
        })
        .then(() => resolve({
            success: true,
            message: 'Account created successfully.',
        }))
        .catch(() => reject({
            success: false,
            message: 'Username already exists.',
        }));
});

const verify = (headers) => {
    if (headers && headers.authorization) {
        const parts = headers.authorization.split(' ');
        if (parts.length === 2) return parts[1];
        return null;
    }
    return null;
};

module.exports = {
    login,
    signup,
    verify,
};
