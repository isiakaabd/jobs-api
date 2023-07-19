const express = require("express");
const { getProducts, createProduct } = require("../controller/products");
const router = express.Router();

router.route("/products").get(getProducts).post(createProduct);

module.exports = router;
