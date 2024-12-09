const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    itemCode: {
      type: String,
      required: true,
      unique: true,
    },
    itemName: {
      type: String,
      required: true,
    },
    onHand: {
      type: Number,
      required: true,
    },
    sales_price: {
      type: Number,
      required: true,
    },
    // categoryId: {
    //   type: String,
    //   required: true,
    // },
    // brandId: {
    //   type: String,
    //   required: true,
    // },
    category: {
      type: new mongoose.Schema({
        id: {
          type: String,
        },
        categoryTitle: {
          type: String,
        },
        mainCategory: {
          type: new mongoose.Schema({
            id: {
              type: String,
            },
            title: {
              type: String,
            },
          }),
        },
      }),
    },

    brand: {
      type: new mongoose.Schema({
        id: {
          type: String,
        },
        brandTitle: {
          type: String,
        },
      }),
    },
    colors: {
      type: [String],
      required: false,
    },
    shortDescription: {
      type: String,
      required: false,
    },
    oldPrice: {
      type: Number,
      required: false,
    },
    SKU: {
      type: String,
      required: true,
      unique: true,
    },
    Specification: {
      type: String,
      required: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    onSale: {
      type: Boolean,
      default: false,
    },
    topRated: {
      type: Boolean,
      default: false,
    },
    specialOffers: {
      type: Boolean,
      default: false,
    },
    defaultImage: {
      type: String,
      required: false,
    },
    otherImages: {
      type: [String],
      required: false,
    },
  }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
