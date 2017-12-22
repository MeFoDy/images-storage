const UserModel = require('./model').model;

const findById = (id) => UserModel.findOne({ id: id });

const findByUsername = (username) => UserModel.findOne({ username: username });

const getList = () => UserModel.find({});

const createNew = ({username, password}) => {
    const newUser = new UserModel({
        username: username,
        password: password,
        images: [],
    });
    return newUser.save();
};

module.exports = {
    createNew,
    findById,
    findByUsername,
    getList,
};
