'use strict';
const express = require('express');
const passport = require('passport');
const {States} = require('./models');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const jwtAuth = passport.authenticate('jwt', { session: false });
router.get('/', [jwtAuth, jsonParser], (req, res) => {
    return States.find({'toggle': 'true'})
        .then(states =>
            res.json(states.map((state) => state.apiRepr())))
        .catch(err => res.status(500).json({message: 'Internal server error'}));
});

router.put('/post', [jwtAuth, jsonParser], (req, res) => {
    const post = req.body;
    post.avatar = req.user.avatar;
    post.user = req.user.username;
    console.log(post);

    return States
        .findOneAndUpdate({name:req.body.state},
            {$push: {'items': post}})
        .then(res.status(204).json())
        .catch(err => {res.status(500).json({messgae: `Internal server error`})});
});

module.exports = {router};