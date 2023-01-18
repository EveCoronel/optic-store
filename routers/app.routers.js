const express = require('express');
const { webAuth, homeAuth, auth } = require('../middlewares/auth');
const router = express.Router();
const authRoutes = require('./auth/auth.routes')
const path = require('path');
const Products = require('../models/products.mongo');
const logger = require('../logger/logger')
const requestLogger = require('../middlewares/requestLogger');
const productsRoutes = require('./products/products.routes')

const ProductsModel = new Products()


router.use('/auth', requestLogger, authRoutes)
router.use('/products', requestLogger, productsRoutes)

router.get('/', webAuth, requestLogger, async (req, res) => {
    res.sendFile(path.resolve('Public/login.html'));
});

router.get('/home', homeAuth, requestLogger, async (req, res) => {
   res.render(path.resolve('Public/index.ejs'), { products: await ProductsModel.getAll(), user: req.user });
});

router.get('/admin', auth, requestLogger, async (req, res) => {
    res.render(path.resolve('Public/admin.ejs'), { products: await ProductsModel.getAll(), user: req.user });
});

router.get('/register', webAuth, requestLogger, async (req, res) => {
    res.sendFile(path.resolve('Public/signup.html'));
});

router.get('/loginError', requestLogger, (req, res) => {
    res.render(path.join(process.cwd(), 'Public/views/pages/loginError.ejs'))
})
router.get('/signupError', requestLogger, (req, res) => {
    res.render(path.join(process.cwd(), 'Public/views/pages/signupError.ejs'))
})

router.post('/products', requestLogger, productsRoutes)

router.get('*', (req, res) => {
    // console.log(req)
    logger.warn({ msg: `${req.url} method:${req.method} not found` })
    res.status(404).send('Página no encontrada')
})


module.exports = router;