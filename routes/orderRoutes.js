const express = require('express');
const { authCheck, adminCheck } = require('../middlewares/auth_middleware');
const { getOrderByUser, getOrderById, getAllOrders, addOrder } = require('../controllers/orderController');

const router = express.Router();


const notAllowed = (req, res) => res.status(405).json('method not allowed');



router.route('/api/order/user').get(authCheck, getOrderByUser).all(notAllowed);
router.route('/api/order/:id').get(authCheck, getOrderById).all(notAllowed);
router.route('/api/orders').get(authCheck, adminCheck, getAllOrders).all(notAllowed);
router.route('/api/create-order').post(authCheck, addOrder).all(notAllowed);

module.exports = router;




