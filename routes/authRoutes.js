const express = require('express');
const { userLogin, userSignUp, userUpdate } = require('../controllers/authController');
const router = express.Router();
const validator = require('express-joi-validation').createValidator({});
const Joi = require('joi');
const { authCheck } = require('../middlewares/auth_middleware');


const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(25).required()
});

const registerSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(25).required()
});
const notAllowed = (req, res) => res.status(405).json('method not allowed');



router.route('/api/userLogin').post(validator.body(loginSchema), userLogin).all(notAllowed);
router.route('/api/userSignUp').post(validator.body(registerSchema), userSignUp).all(notAllowed);

router.route('/api/userUpdate').patch(authCheck, userUpdate).all(notAllowed);


module.exports = router;




