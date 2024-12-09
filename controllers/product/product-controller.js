const Brand = require("../../models/Brand");
const Category = require("../../models/Category");
const Product = require("../../models/Product");

const postProduct = async (req, res) => {
  const categoryId = req.body.categoryId;
  const brandId = req.body.brandId;
  console.log(req.body);

  try {
    const {
      itemCode,
      itemName,
      onHand,
      sales_price,
      colors,
      shortDescription,
      oldPrice,
      SKU,
      Specification,
      featured,
      onSale,
      topRated,
      specialOffers,
      defaultImage,
      otherImages,
      categoryId,
      brandId,
    } = req.body;

    const foundCategory = await Category.findById(categoryId);
    const foundBrand = await Brand.findById(brandId);

    const newProduct = new Product({
      itemCode,
      itemName,
      onHand,
      sales_price,
      colors,
      shortDescription,
      oldPrice,
      SKU,
      Specification,
      featured,
      onSale,
      topRated,
      specialOffers,
      defaultImage,
      otherImages,
      category: {
        _id: foundCategory._id,
        categoryTitle: foundCategory.categoryTitle,
        mainCategory: {
          _id: foundCategory.mainCategory._id,
          title: foundCategory.mainCategory.title,
        },
      },
      brand: {
        _id: foundBrand._id,
        brandTitle: foundBrand.brandTitle,
      },
    });
    await newProduct.save();
    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error occurred!",
    });
  }
};
const getProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const foundProduct = await Product.findById(id);

    if (!foundProduct) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    } else {
      return res.status(200).json({
        success: true,
        data: foundProduct,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};
const getProductByCategory = async (req, res) => {
  const { id } = req.params; // Category ID
  console.log(id);
  
  const filters = req.query; // Query parameters for filtering

  try {
    // Build the query dynamically
    const query = { "category._id": id };

    // Add query filters dynamically if provided
    if (filters.brand) {
      // Handle multiple brands
      const brands = Array.isArray(filters.brand)
        ? filters.brand
        : filters.brand.split(","); // Split by comma if passed as a single string
      query["brand.brandTitle"] = { $in: brands }; // Match any of the brands
    }

    if (filters.priceMin && filters.priceMax) {
      query["sales_price"] = {
        $gte: parseFloat(filters.priceMin), // Minimum price
        $lte: parseFloat(filters.priceMax), // Maximum price
      };
    }

    const products = await Product.find(query);
    console.log("Query:", query); // Debugging purposes

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found for the specified category and filters",
      });
    }

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Error occurred while fetching products",
    });
  }
};
const getFeaturedProducts = async (req, res) => {
  try {
    console.log("Fetching featured products");
    const featuredProducts = await Product.find({ featured: true });
    res.status(200).json({
      success: true,
      data: featuredProducts,
    });
  } catch (error) {
    console.error("Error fetching featured products:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch featured products",
      error: error.message,
    });
  }
};
const getOnSaleProducts = async (req, res) => {
  try {
    console.log("Fetching featured products");
    const onSaleProducts = await Product.find({ onSale: true });
    res.status(200).json({
      success: true,
      data: onSaleProducts,
    });
  } catch (error) {
    console.error("Error fetching featured products:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch featured products",
      error: error.message,
    });
  }
};
const getTopRatedProducts = async (req, res) => {
  try {
    console.log("Fetching featured products");
    const topRatedProducts = await Product.find({ topRated: true });
    res.status(200).json({
      success: true,
      data: topRatedProducts,
    });
  } catch (error) {
    console.error("Error fetching featured products:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch featured products",
      error: error.message,
    });
  }
};
const getSpecialOfferProducts = async (req, res) => {
  try {
    console.log("Fetching featured products");
    const specialOffersProducts = await Product.find({ specialOffers: true });
    res.status(200).json({
      success: true,
      data: specialOffersProducts,
    });
  } catch (error) {
    console.error("Error fetching featured products:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch featured products",
      error: error.message,
    });
  }
};

module.exports = {
  postProduct,
  getProduct,
  getProducts,
  getProductByCategory,
  getFeaturedProducts,
  getOnSaleProducts,
  getTopRatedProducts,
  getSpecialOfferProducts,
};