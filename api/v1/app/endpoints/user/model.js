const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

UserSchema.pre('save', function (next) {
    const user = this;
    if (user.isModified('password') || user.isNew) {
        bcrypt.genSalt(10, (error, salt) => {
            if (error) return next(error);
            bcrypt.hash(user.password, salt, (error, hash) => {
                if (error) return next(error);
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, (error, matches) => {
        if (error) return callback(error);
        callback(null, matches);
    });
};

const UserModel = mongoose.model('User', UserSchema);

module.exports = {
    model: UserModel,
    schema: UserSchema,
};
