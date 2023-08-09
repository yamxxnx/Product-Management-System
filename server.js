const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const { connectToDB } = require("./database/db");
const Product = require("./database/product");

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "views")));
app.use("/img", express.static(path.join(__dirname, "img")));

connectToDB()
  .then(() => {
    app.post("/add-product", async (req, res) => {
      try {
        const newProductData = {
          productName: req.body.productName,
          productCode: req.body.productCode,
          productWeight: req.body.productWeight,
          productPrice: req.body.productPrice,
          productCountry: req.body.productCountry,
          productStock: req.body.productStock,
          productOffer: req.body.productOffer,
          productDiscount: req.body.productDiscount,
          productImage: req.body.productImage,
        };

        const newProduct = new Product(newProductData);
        await newProduct.save();

        res.json(newProduct);
      } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ error: "Error adding product" });
      }
    });

    app.get("/", async (req, res) => {
      try {
        const products = await Product.find();
        res.render("index", { products: products });
      } catch (error) {
        console.error("Error retrieving products:", error);
        res.status(500).json({ error: "Error retrieving products" });
      }
    });

    const PORT = process.env.PORT || 3001;

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error in MongoDB connection:", err);
  });
