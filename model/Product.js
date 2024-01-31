


const mongoose = require('mongoose');


const reviewSchema = mongoose.Schema({

  username: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },

  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  }

}, { timestamps: true });


const productSchema = mongoose.Schema({
  product_name: {
    type: String,
    required: true
  },
  product_detail: {
    type: String,
    required: true
  },
  product_price: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  },
  product_image: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  countInStock: {
    type: Number,
    max: [1000, 'max value exceeded'],
    required: true
  },
  reviews: [reviewSchema]
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);


module.exports = Product;