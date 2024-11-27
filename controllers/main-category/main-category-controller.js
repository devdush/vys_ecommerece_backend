const Category = require("../../models/Category");
const MainCategory = require("../../models/MainCategory");

//add new main category
const postMainCategory = async (req, res) => {
  const { title } = req.body;
  try {
    const newMainCategory = new MainCategory({
      title,
    });
    await newMainCategory.save();
    res.status(201).json({
      success: true,
      data: newMainCategory,
    });
  } catch (error) {
    if (error.errorResponse.code === 11000) {
      res.json({
        success: false,
        message: `The category title "${title}" already exists. Please choose a unique title.`,
      });
    } else {
      res.json({
        success: false,
        message: "Error occurred",
      });
    }
  }
};
//fetch  main category
const getMainCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const findMainCategory = await MainCategory.findById(id);

    if (!findMainCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    } else {
      return res.status(200).json({
        success: true,
        data: findMainCategory,
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
//fetch all  main category
const getMainCategory = async (req, res) => {
  try {
    const listOfMainCategories = await MainCategory.find({});
    res.status(200).json({
      success: true,
      data: listOfMainCategories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};
const getCategoriesByMainCategory = async (req, res) => {
  const { id } = req.params; // Extract the main category ID from request parameters

  try {
    // Find all categories that have a reference to the specified main category ID
    const categories = await Category.find({ "mainCategory._id": id });
    console.log(id);
    
    if (!categories || categories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No categories found for the specified main category",
      });
    }

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      success: false,
      message: "Error occurred while fetching categories",
    });
  }
};

//edit  main category
const putMainCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const findMainCategory = await MainCategory.findById(id);
    if (!findMainCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    } else {
      console.log(findMainCategory);

      findMainCategory.title = title || findMainCategory.title;
      await findMainCategory.save();
      res.status(200).json({
        success: true,
        data: findMainCategory,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};
//delete  main category
const deleteMainCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const sd = await Category.deleteMany({ "mainCategory._id": id });
    console.log(sd);

    res.status(200).json({
      success: true,
      message:
        "Main category and all associated categories deleted successfully!",
    });

    // First, delete the MainCategory document
    const mainCategory = await MainCategory.findByIdAndDelete(id);

    if (!mainCategory) {
      return res.status(404).json({
        success: false,
        message: "Main category not found",
      });
    }

    // Then, delete all Category documents that reference this main category
  } catch (error) {
    console.error("Error during deletion:", error);
    res.status(500).json({
      success: false,
      message: "Error occurred during deletion",
    });
  }
};

module.exports = {
  postMainCategory,
  getMainCategoryById,
  getMainCategory,
  putMainCategory,
  deleteMainCategory,
  getCategoriesByMainCategory
};
