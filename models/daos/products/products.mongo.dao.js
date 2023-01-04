/* const mongoContainer = require('../../containers/mongo.container')
const { Schema } = require('mongoose')

const collection = 'products'
const productSchema = new Schema({
    title: {type: String},
    thumbnail: {type: String},
    stock: {type: Number},
    price: {type: Number},
    description: {type: String}
})


class DaoProductsMongo extends mongoContainer {
    constructor() {
        super( collection, productSchema)
    }
}

module.exports = DaoProductsMongo; */