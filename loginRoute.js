const express = require('express');
const passport = require('passport');
const router = express.Router();
const ctrl = require('../controllers/login');

//Login Router
router.get('', ctrl.getLogin);
router.route('').all(passport.authenticate('local', { failureRedirect: "/login" }), (req, res) => {
    if (req.user.role == true) {
        res.redirect('/admin');
    }
    if (req.user.role == false) {
        res.redirect('/employee');
    }
})

module.exports = router;