const express = require('express')
const passport = require('passport')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

router
.route('/')
// Get logged in user’s details
.get((req, res) => {
    // global.User
})

module.exports = router
