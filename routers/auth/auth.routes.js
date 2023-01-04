const express = require('express');
const router = express.Router();
const path = require('path');
const authControllers = require('../../controllers/auth.controllers');
const passport = require('../../middlewares/passport')

router.get('/login', (req, res) => {
    res.sendFile(path.resolve('Public/login.html'));
});

router.post('/login', passport.authenticate('login', { failureRedirect: '/loginError', successRedirect: '/home' }));
router.post('/register', passport.authenticate('signup', { failureRedirect: '/signupError', successRedirect: '/home' }));
router.post('/logout', authControllers.logout);

router.get('/logout', async (req, res) => { res.redirect('/') });

module.exports = router;