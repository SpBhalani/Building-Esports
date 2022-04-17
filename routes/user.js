const express = require("express");
const { singnUp , signIn, signOut } = require("../controller");
const { signUpValidate , signInValidate } = require('../Validate/auth')
const route = express.Router();

route.post('/signup' , signUpValidate , singnUp)
route.post('/signin' , signInValidate , signIn)
route.post('/signout' , signOut)

module.exports = route;
