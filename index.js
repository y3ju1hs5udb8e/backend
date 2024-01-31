const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const mongoose = require("mongoose");
const port = 5000;
const cors = require("cors");
const fileUpload = require("express-fileupload");

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://localhost:27017/Shops")
  .then((result) => {
    app.listen(port, () => {
      console.log("listening");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
    abortOnLimit: true,
  })
);

app.use(authRoutes);
app.use(productRoutes);
app.use(orderRoutes);

app.use((req, res) => {
  return res.status(404).json("not found");
});
