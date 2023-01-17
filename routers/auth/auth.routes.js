const express = require('express');
const router = express.Router();
const path = require('path');
const { AuthControllers, upload } = require('../../controllers/auth.controllers');
const passport = require('../../middlewares/passport')

const authController = new AuthControllers()
router.get('/login', (req, res) => {
    res.sendFile(path.resolve('Public/login.html'));
});

router.post('/login', passport.authenticate('login', { failureRedirect: '/loginError', successRedirect: '/home' }));

router.post('/register', upload.single('profilePicture'), authController.register);

router.post('/logout', authController.logout);

router.get('/logout', async (req, res) => { res.redirect('/') });

module.exports = router;