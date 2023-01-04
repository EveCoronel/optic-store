const firebaseContainer = require('../../containers/firebase.container')

class DaoProductsFirebase extends firebaseContainer {
    constructor() {
        super('products')
    }
}

module.exports = DaoProductsFirebase;