const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes");
const mainCategoryRouter = require("./routes/main-category/main-category-routes");
const categoryRouter = require("./routes/category/category");
const brandRouter = require("./routes/brand/brand-routes");
const productRouter = require("./routes/product/product-route");
const warrantyRouter = require("./routes/warranty-service/warranty-service-route");
const cartRouter = require("./routes/cart/cart");
const orderRouter = require("./routes/order/order-routes");
mongoose
  .connect(
    "mongodb+srv://vsofttechnologie:i9Q8Yi1UBNZbd3TT1022@cluster0.on4og.mongodb.net/"
    
  )
  .then(() => console.log("MongoDB Connecterd"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:3000",
        "http://vys.lk.s3-website.eu-north-1.amazonaws.com", // Remove trailing slash
        "https://d2nxkctoz1lsbk.cloudfront.net",
        "https://vys.lk"
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy does not allow access from this origin"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true, // Needed for cookies or authentication headers
  })
);
app.options("*", cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/main-category", mainCategoryRouter);
app.use("/api/category", categoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/product", productRouter);
app.use("/api/warranty", warrantyRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
