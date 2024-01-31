const express = require('express');
const { getAllProducts, addProduct, getProduct, removeProduct, updateProduct, reviewAdd } = require('../controllers/productController');
const { authCheck, adminCheck } = require('../middlewares/auth_middleware');
const { fileCheck, updateCheck } = require('../middlewares/file_check');
const router = express.Router();


const notAllowed = (req, res) => res.status(405).json('method not allowed');

//dashboard
router.route('/').get((req, res) => {
  return res.status(200).json('Welcome to shop backs');
}).all(notAllowed);

router.route('/api/products').get(getAllProducts).all(notAllowed);
router.route('/api/product/:id').get(getProduct).delete(authCheck, adminCheck, removeProduct).patch(authCheck, adminCheck,
  updateCheck, updateProduct).all(notAllowed);
router.route('/api/add-product').post(authCheck, adminCheck,
  fileCheck, addProduct).all(notAllowed);

router.route('/api/add-review/:id').patch(authCheck, reviewAdd).all(notAllowed);



module.exports = router;



