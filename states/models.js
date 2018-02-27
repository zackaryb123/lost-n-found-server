'use strict';
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const StatesSchema = mongoose.Schema({
    name: {type: String, default: ''},
    toggle: {type: Boolean, default: true},
    items: {type: Array, default: []}
});

StatesSchema.methods.apiRepr = function () {
    return {
        name: this.name,
        items: this.items
    };
};

const States = mongoose.model('States', StatesSchema);

module.exports = {States};