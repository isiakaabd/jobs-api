require("dotenv").config();
require("express-async-errors");

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const app = express();
const port = process.env.PORT || 1992;
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const { connectDB } = require("./db/connect");
const products = require("./routes/products");
const tasks = require("./routes/task");
const jobs = require("./routes/jwt");
const auth = require("./routes/auth");

const errorHandlerMiddleware = require("./middleware/errorHandler");
const authenticationMiddleware = require("./middleware/auth");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const swaggerDocument = YAML.load("./swagger.yaml");

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(limiter);
app.set("trust proxy", 1);
app.use(express.static("src/public"));
app.use(express.urlencoded({ extended: false }));
// routes

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use("/tasks", tasks);
app.use("/api/v1", products);
app.use("/api/v1/auth", auth);
app.use("/api/v1", authenticationMiddleware, jobs);

app.use(errorHandlerMiddleware);

// allproducts
// console.log(app.use("/api/v1/auth", auth));
app.all("*", (req, res) => {
  res.status(404).json({ message: "RESOURCE NOT FOUND" });
});

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => console.log(`server listening on port ${port}`));
  } catch (error) {
    console.log(error.message);
  }
};
//
start();
