'use strict';
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {User} = require('../users/models');
//const cloudinary = require('cloudinary');
//const multer = require('multer');

const config = require('../config');
const router = express.Router();
//const upload = multer({ dest: '/images'});

// cloudinary.config({
//     cloud_name: 'diygdnbei',
//     api_key: '754675185139821',
//     api_secret: 'N3eXQJDrvrvL_KWGKi1YYRYFrHk'
// });

const createAuthToken = function(user) {
  return jwt.sign({user}, config.JWT_SECRET, {
    subject: user.username,
    expiresIn: config.JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

const localAuth = passport.authenticate('local', {session: false});
// The user provides a username and password to login
router.post('/login', localAuth, (req, res) => {
  const authToken = createAuthToken(req.user.apiRepr());
  res.json({authToken});
});

const jwtAuth = passport.authenticate('jwt', {session: false});
// The user exchanges a valid JWT for a new one with a later expiration
router.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({authToken});
});

router.put('/update', jwtAuth, /*upload.single('avatar')],*/ (req, res) => {
    const username  = req.user.username;
    console.log(req.body);

    // if ('file' in req) {
    //     cloudinary.v2.uploader.upload(req.file.path,
            // {tags: [req.body]}
        // ).then(function (update) {
            //console.log(update);
            return User
                .findOneAndUpdate({username: username},
                    {
                        'email': req.body.email //update.tags[0].email,
                        // 'avatar': update.secure_url,
                        // 'returnRate': update.tags[0].returnRate,
                        // 'itemCount': update.tags[0].itemCount
                    })
                .then(updatedPost => {
                    console.log(updatedPost);
                    console.log(`Updating profile for \`${username}\``);
                    res.status(204).json(updatedPost);
                }).catch(err => {
                    console.log(err);
                    res.status(500).json({messgae: `Internal server error`})
                });
        // });
    // }
    // if (!'file' in req) {
    //     return User
    //         .findOneAndUpdate({username: username},
    //             {
    //                 'email': req.body.email,
    //                 'returnRate': req.body.returnRate,
    //                 'itemCount': req.body.itemCount
    //             })
    //         .then(updatedPost => {
    //             console.log(updatedPost);
    //             console.log(`Updating profile for \`${req.params.username}\``);
    //             res.status(204).json(updatedPost);
    //         }).catch(err => {
    //             console.log(err);
    //             res.status(500).json({messgae: `Internal server error`})
    //         });
    // }
});

module.exports = {router};
