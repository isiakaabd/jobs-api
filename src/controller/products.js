const { asynFunction } = require("../middleware");
const Product = require("../models/products");

const getProducts = asynFunction(async (req, res) => {
  const { featured, name, company, sort, fields, page, limit } = req.query;
  const queryObject = {
    ...(featured && { featured }),
    ...(name && { name: { $regex: name, $options: "i" } }),
    ...(company && { company }),
  };
  let result = Product.find(queryObject);
  if (sort) {
    let sortList = sort.split(",").join(" ");

    result = result.sort(sortList);
  } else {
    result = result.sort("-createdAt");
  }
  if (fields) {
    let fieldList = fields.split(",").join(" ");

    result = result.select(fieldList);
  }
  const pageN = Number(page) || 1;
  const limitN = Number(limit) || 10;
  const skip = (pageN - 1) * limitN;
  const products = await result.skip(skip).limit(limitN);
  res.status(200).json({ success: true, products });
});
const createProduct = asynFunction(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
});
module.exports = {
  getProducts,
  createProduct,
};
