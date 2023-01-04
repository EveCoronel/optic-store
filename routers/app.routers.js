const express = require('express');
const { webAuth, homeAuth } = require('../middlewares/auth');
const router = express.Router();
const authRoutes = require('./auth/auth.routers')
const productsRoutes = require('./products/products.routers')
const path = require('path');
const Products = require('../models/products.mongo');
const logger = require('../logger/logger')
const infoRoutes = require('./info/info.routers')
const randomRoutes = require('./random/random.router');
const requestLogger = require('../middlewares/requestLogger');

const ProductsModel = new Products()


router.use('/auth', authRoutes)
router.use('/info', infoRoutes)
router.use('/random', randomRoutes)
router.use('/products', productsRoutes)

router.get('/', webAuth, requestLogger, async (req, res) => {
    res.sendFile(path.resolve('Public/login.html'));
});

router.get('/home', homeAuth, requestLogger, async (req, res) => {
    res.render(path.resolve('Public/index.ejs'), { products: ProductsModel.getAll(), user: req.user });
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