const express = require('express');
const router = express.Router();
const path = require('path');
const { AuthControllers, upload } = require('../../controllers/auth.controllers');
const { webAuth } = require('../../middlewares/auth');
const passport = require('../../middlewares/passport');
const requestLogger = require('../../middlewares/requestLogger');

const authController = new AuthControllers()
router.get('/login', (req, res) => {
    res.sendFile(path.resolve('Public/login.html'));
});

router.post('/login', passport.authenticate('login', { failureRedirect: '/auth/loginError', successRedirect: '/home' }));

router.post('/register', upload.single('profilePicture'), authController.register);

router.post('/logout', authController.logout);

router.get('/logout', async (req, res) => { res.redirect('/') });

router.get('/loginError', requestLogger, (req, res) => {
    res.render(path.join(process.cwd(), 'Public/views/pages/authentication/loginError.ejs'))
})
router.get('/signupError', requestLogger, (req, res) => {
    res.render(path.join(process.cwd(), 'Public/views/pages/authentication/signupError.ejs'))
})

router.get('/register', webAuth, requestLogger, async (req, res) => {
    res.sendFile(path.resolve('Public/signup.html'));
});

module.exports = router;
    
    