

const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({


  name: {
    type: String,
    required: true
  },
  qty: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },
  product: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Product',
    required: true
  }

}, { timestamps: true });


const orderSchema = mongoose.Schema({
  orderItems: [itemSchema],
  totalAmount: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },



}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);


module.exports = Order;