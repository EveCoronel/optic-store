const express = require('express');
const { webAuth, homeAuth, auth } = require('../middlewares/auth');
const router = express.Router();
const authRoutes = require('./auth/auth.routes')
const path = require('path');
const Products = require('../models/products.mongo');
const logger = require('../logger/logger')
const requestLogger = require('../middlewares/requestLogger');
const productsRoutes = require('./products/products.routes')
const cartsRoutes = require('../routers/carts/cart.routes');
const { CartsDao } = require('../models/daos/app.daos');
const checkoutController = require('../controllers/checkout.controllers');

const CartModel = new CartsDao()

const ProductsModel = new Products()



router.use('/auth', requestLogger, authRoutes)
router.use('/products', requestLogger, productsRoutes)
router.use('/carts', requestLogger, cartsRoutes)

router.get('/', webAuth, requestLogger, async (req, res) => {
    res.sendFile(path.resolve('Public/login.html'));
});

router.get('/home', homeAuth, requestLogger, async (req, res) => {
    let { category } = req.query;
    if (category) res.render(path.resolve('Public/index.ejs'), { products: await ProductsModel.getByCategory(category), user: req.user });
    else res.render(path.resolve('Public/index.ejs'), { products: await ProductsModel.getAll(), user: req.user });
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

router.get('/cart', auth, requestLogger, async (req, res) => {
    res.render(path.resolve('Public/cartView.ejs'), { cart: await CartModel.getProductsInCart(req.user.cart), user: req.user });
});

router.post('/checkout/:idCart', requestLogger, checkoutController.checkout)


router.get('*', (req, res) => {
    // console.log(req)
    logger.warn({ msg: `${req.url} method:${req.method} not found` })
    res.status(404).send('Página no encontrada')
})


module.exports = router;