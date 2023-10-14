const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

//  require routes:
const userRouter = require("./routes/user.route");
const imageRouter = require("./routes/imageupload.route");
const categoryRouter = require("./routes/category.route");
const subCategoryRoute = require("./routes/subCategory.route");
const productRouter = require("./routes/product.route");
//  use middlewares :
app.use(cors());
app.use(express.json());

//  use route middlewares:

app.use("/api/v1/user", userRouter);
app.use("/api/v1/image", imageRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/sub-category", subCategoryRoute);
app.use("/api/v1/product", productRouter);

// export app:
module.exports = app;
