const UserRepository = require('./repository');

const list = () => new Promise((resolve, reject) => {
    UserRepository
        .getList()
        .then(users => resolve({
            succes: true,
            users,
        }))
        .catch(error => reject(error));
});


module.exports = {
    list,
};
