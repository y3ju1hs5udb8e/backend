const path = require('path');
const fs = require('fs');


module.exports.fileCheck = (req, res, next) => {
  if (!req.files?.product_image) {
    return res.status(400).json('please provide image');
  } else {
    const file = req.files?.product_image;
    const exts = ['.png', '.jpeg', '.jpg'];
    const filePath = path.extname(file.name);
    if (exts.includes(filePath)) {
      file.mv(`./uploads/${file.name}`, (err) => {

      });
      req.imagePath = `/uploads/${file.name}`;

      next();
    } else {
      return res.status(400).json('please provide valid image');
    }



  }


}


module.exports.updateCheck = (req, res, next) => {
  if (!req.files?.product_image) {
    next();
  } else {
    fs.unlink(`.${req.body.prevImage}`, (err) => {
      console.log(err);
    });
    const file = req.files?.product_image;
    const exts = ['.png', '.jpeg', '.jpg'];
    const filePath = path.extname(file.name);
    if (exts.includes(filePath)) {
      file.mv(`./uploads/${file.name}`, (err) => {

      });
      req.imagePath = `/uploads/${file.name}`;

      next();
    } else {
      return res.status(400).json('please provide valid image');
    }



  }


}


