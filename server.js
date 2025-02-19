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
      // Allow requests from localhost:3000 (React development) and your S3 URL
      const allowedOrigins = [
        "http://localhost:3000",
        "http://vys.lk.s3-website-us-east-1.amazonaws.com",
      ];
      if (allowedOrigins.includes(origin) || !origin) {
        // If origin is in the allowed list or no origin (for Postman/cURL requests), proceed
        callback(null, true);
      } else {
        // Reject if origin is not in the allowed list
        callback(
          new Error("CORS policy does not allow access from this origin")
        );
      }
    },
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"], // Allow required methods
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true, // If you need to send cookies with requests
  })
);
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
