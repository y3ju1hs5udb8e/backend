const Order = require('../model/Order');
const Product = require('../model/Product');

module.exports.getOrderByUser = async (req, res) => {

  try {
    const data = await Order.find({ user: req.userInfo.id });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(400).json(`${err}`);
  }

}


module.exports.getAllOrders = async (req, res) => {
  try {
    const data = await Order.find();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(400).json(`${err}`);
  }

}



module.exports.addOrder = async (req, res) => {
  const {
    orderItems,
    totalAmount } = req.body;
  try {
    const response = await Order.create({
      orderItems,
      totalAmount,
      user: req.userInfo.id
    });

    response.orderItems.forEach(async ({ product, qty }) => {
      await Product.findByIdAndUpdate(
        product,
        { $inc: { countInStock: -qty } })
    });

    return res.status(200).json('success');
  } catch (err) {
    return res.status(400).json(`${err}`);
  }

}


module.exports.getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Order.findById(id);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(400).json(`${err}`);
  }

}
