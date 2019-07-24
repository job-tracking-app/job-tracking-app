const express = require("express");
const router = require('express-promise-router')();
const passport = require("passport");
const passportConf = require("../passport");
const { validateBody, schemas } = require('../helpers/routeHelpers');
const userHandler = require("../handlers/users");

router.post('/signup', validateBody(schemas.authSchema), userHandler.signUp);
router.post("/signin", validateBody(schemas.authSchema), passport.authenticate("local", {session:false}), userHandler.signIn);
router.post("/oauth/google", passport.authenticate("googleToken", {session:false}), userHandler.googleOAuth);
router.post("/oauth/facebook", passport.authenticate("facebookToken",{session:false}), userHandler.facebookOAuth);
router.get('/secret', passport.authenticate("jwt", {session:false}), userHandler.secret);

module.exports = router;