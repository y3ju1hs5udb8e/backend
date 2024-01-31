const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports.userLogin = async (req, res) => {

  const { email, password } = req.body;
  try {
    const existUser = await User.findOne({ email: email });
    if (existUser) {
      const pass = bcrypt.compareSync(password, existUser.password);
      if (!pass) return res.status(401).json('invalid credential');

      const token = jwt.sign({
        id: existUser._id,
        isAdmin: existUser.isAdmin
      }, 'webtoken');

      return res.status(200).json({
        token,
        id: existUser._id,
        isAdmin: existUser.isAdmin,
        message: 'successfully login',
        email: existUser.email,
        fullname: existUser.fullname,
        shippingAddress: existUser.shippingAddress
      });
    } else {
      return res.status(401).json('user not found');
    }
  } catch (err) {
    return res.status(400).json(`${err}`);
  }

}






module.exports.userSignUp = async (req, res) => {
  const { email, password, fullname } = req.body;
  try {
    const existUser = await User.findOne({ email: email });

    if (existUser) {
      return res.status(401).json('user already exist');
    } else {
      const hashPassword = bcrypt.hashSync(password, 10);
      await User.create({
        email,
        password: hashPassword,
        fullname
      });
      return res.status(201).json('successfully registered');
    }
  } catch (err) {
    return res.status(400).json(`${err}`);
  }

}



module.exports.userUpdate = async (req, res) => {

  const { email, fullname, shippingAddress } = req.body;
  try {
    const existUser = await User.findById(req.userInfo.id);
    if (existUser) {
      existUser.email = email || existUser.email;
      existUser.fullname = fullname || existUser.fullname;
      existUser.shippingAddress = shippingAddress || existUser.shippingAddress;
      await existUser.save();
      return res.status(200).json('successfully update');
    } else {
      return res.status(401).json('user not found');
    }
  } catch (err) {
    return res.status(400).json(`${err}`);
  }

}


