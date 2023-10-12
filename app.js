const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

//  require routes:
const userRouter = require("./routes/user.route");
const imageRouter = require("./routes/imageupload.route");
const categoryRouter = require("./routes/category.route");
//  use middlewares :
app.use(cors());
app.use(express.json());

//  use route middlewares:

app.use("/api/v1/user", userRouter);
app.use("/api/v1/image", imageRouter);
app.use("/api/v1/category", categoryRouter);

// export app:
module.exports = app;
