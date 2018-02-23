'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
import avatar from '../images/avatar.png';

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    avatar: {type: String, default: avatar},
    itemCount:{type: Number, default: 0},
    returnRate:{type: Number, default: 0}
});

UserSchema.methods.apiRepr = function () {
    return {
        username: this.username || '',
        firstName: this.firstName || '',
        lastName: this.lastName || '',
        email: this.email || '',
        avatar: this.avatar || avatar,
        itemCount: this.itemCount || 0,
        returnRate: this.returnRate || 0

    };
};

UserSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function (password) {
    return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', UserSchema);

module.exports = {User};
