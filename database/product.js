const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productCode: { type: String, required: true },
  productWeight: { type: Number, required: true },
  productPrice: { type: Number, required: true },
  productCountry: { type: String, required: true },
  productStock: { type: Number, required: true },
  productOffer: { type: String, required: true },
  productDiscount: { type: Number, required: true },
  productImage: { type: String, required: true }, 

});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
