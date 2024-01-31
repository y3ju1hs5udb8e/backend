const Product = require('../model/Product');


module.exports.getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Product.findById(id);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(400).json(`${err}`);
  }

}


module.exports.getAllProducts = async (req, res) => {
  try {
    const data = await Product.find();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(400).json(`${err}`);
  }

}



module.exports.addProduct = async (req, res) => {
  const {
    product_name,
    product_detail,
    product_price,
    brand,
    category,
    countInStock } = req.body;
  try {
    await Product.create({
      product_name,
      product_detail,
      product_price,
      product_image: req.imagePath,
      brand,
      category,
      countInStock
    });
    return res.status(200).json('success');
  } catch (err) {
    return res.status(400).json(`${err}`);
  }

}




module.exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    product_name,
    product_detail,
    product_price,
    brand,
    category,
    countInStock } = req.body;
  try {
    if (req.imagePath) {
      await Product.findByIdAndUpdate(id, {
        product_name,
        product_detail,
        product_price,
        product_image: req.imagePath,
        brand,
        category,
        countInStock
      });
    } else {
      await Product.findByIdAndUpdate(id, {
        product_name,
        product_detail,
        product_price,
        brand,
        category,
        countInStock
      })
    }


    return res.status(200).json('success');
  } catch (err) {
    return res.status(400).json(`${err}`);
  }

}





module.exports.reviewAdd = async (req, res) => {
  const { id } = req.params;
  const userId = req.userInfo.id;
  const { username, comment, rating } = req.body;
  try {
    const existProduct = await Product.findById(id);
    if (existProduct) {
      const isThere = existProduct.reviews.find((r) => r.user.toString() === userId);

      if (isThere) {
        return res.status(400).json('you have already review it');
      } else {
        existProduct.reviews.push({ username, comment, rating, user: userId });
        existProduct.numReviews = existProduct.reviews.length;
        const total = existProduct.reviews.reduce((a, b) => a + b.rating, 0)
        existProduct.rating = total / existProduct.reviews.length;
        await existProduct.save();
        return res.status(200).json('successfully added');
      }
    } else {
      return res.status(404).json('product not found');
    }




  } catch (err) {
    return res.status(400).json(`${err}`);
  }

}



module.exports.removeProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Product.findByIdAndDelete(id);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(400).json(`${err}`);
  }

}
