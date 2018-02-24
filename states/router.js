'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const {States} = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();

const jwtAuth = passport.authenticate('jwt', { session: false });
router.get('/', [jsonParser, jwtAuth], (req, res) => {
    return States.find({'toggle': 'true'})
        .then(states =>
            res.json(states.map((state) => state.apiRepr())))
        .catch(err => res.status(500).json({message: 'Internal server error'}));
});

module.exports = {router};