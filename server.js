const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes");
const mainCategoryRouter = require("./routes/main-category/main-category-routes");
const categoryRouter = require("./routes/category/category");
const brandRouter = require("./routes/brand/brand-routes");
const productRouter = require("./routes/product/product-route");
mongoose
  .connect(
    "mongodb+srv://vsofttechnologie:i9Q8Yi1UBNZbd3TT1022@cluster0.on4og.mongodb.net/"
  )
  .then(() => console.log("MongoDB Connecterd"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;

const cors = require("cors");

app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "DELETE", "PUT"], // Specify allowed HTTP methods
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ], // Specify allowed headers
    credentials: false, // Set to false since credentials can't be used with '*' origin
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/main-category", mainCategoryRouter);
app.use("/api/category", categoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/product", productRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
