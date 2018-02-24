'use strict';
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const StatesSchema = mongoose.Schema({
    name: {type: String, default: 'Alabama'},
    toggle: {type: Boolean, default: true},
});

StatesSchema.methods.apiRepr = function () {
    return {
        name: this.name
    };
};

const States = mongoose.model('States', StatesSchema);

module.exports = {States};