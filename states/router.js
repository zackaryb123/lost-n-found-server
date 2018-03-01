'use strict';
const express = require('express');
//const bodyParser = require('body-parser');
const passport = require('passport');

const {States} = require('./models');

const router = express.Router();

//const jsonParser = bodyParser.json();

const jwtAuth = passport.authenticate('jwt', { session: false });
router.get('/', jwtAuth, (req, res) => {
    return States.find({'toggle': 'true'})
        .then(states =>
            res.json(states.map((state) => state.apiRepr())))
        .catch(err => res.status(500).json({message: 'Internal server error'}));
});

router.put('/post', jwtAuth, (req, res) => {
    console.log(req);
    return States
        .findOneAndUpdate({name:req.body.state},
            {$push: {'items': req.body}})
        .then(res.status(204).json())
        .catch(err => {res.status(500).json({messgae: `Internal server error`})});
});

//use params to get the unique state
// router.get('/items/:name', [jsonParser, jwtAuth], (req, res) => {
//     let {name} = req.params;
//    return States.findOne({name: name})
//        .then(state => res.json(state.apiRepr()))
//        .catch(err => res.status(500).json({message: 'Internal server error'}));
// });

module.exports = {router};