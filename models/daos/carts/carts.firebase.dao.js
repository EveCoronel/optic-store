const { HTTP_STATUS } = require('../../../constants/api.constants');
const { HttpError } = require('../../../utils/utils');
const FirebaseContainer = require('../../containers/firebase.container')
const { arrayUnion } = require('firebase-admin')

class DaoCartsFirebase extends FirebaseContainer {

    constructor() {
        super('carts')
    }

    async createCart() {
        let item = {
            timestrap: Date.now(),
            products: []
        }
        const docRef = this.query.doc();
        return await docRef.set(item);
    }

    async getProductsInCart(id) {
        const docRef = this.query.doc(id);
        const document = await docRef.get();
        if (!document.data()) {
            const message = `Resource with id ${id} does not exist in our records`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }
        let cart = document.data();
        return cart.products
    }

    async addProduct(id, idProducto) {
        const docRef = this.query.doc(id);
        const document = await docRef.get();
        if (!document.data()) {
            const message = `Resource with id ${id} does not exist in our records`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }
        /* No funciona
        await docRef.update({
            products: FieldValue.arrayUnion(Idproducto)
        }); */
        const cart = document.data();
        const productsInCart = cart.products
        productsInCart.push(idProducto)
        return await docRef.update({ products: productsInCart });
    }

    async deleteProductById(idCart, idProd) {
        const docRef = this.query.doc(idCart);
        const document = await docRef.get();
        if (!document.data()) {
            const message = `Resource with id ${id} does not exist in our records`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }
        const cart = document.data();
        const index = cart.products.findIndex((item) => item == idProd)
        if (!index) {
            const message = `Product with id ${idProd} does not exist in our records`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }
        cart.products.splice(index, 1)
        return await docRef.set({ cart: cart });
    }
}

module.exports = DaoCartsFirebase;