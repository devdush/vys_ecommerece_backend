const Category = require("../../models/Category");
const MainCategory = require("../../models/MainCategory");

const postCategory = async (req, res) => {
  try {
    const mainCategory = await MainCategory.findById(req.body.mainCategoryId);
    console.log(mainCategory);

    const { categoryTitle } = req.body;
    const mainCategory_Id = mainCategory._id;
    const category = new Category({
      categoryTitle,
      mainCategory: {
        _id: mainCategory_Id,
        title: mainCategory.title,
      },
    });
    await category.save();
    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Error occurred",
    });
  }
};
const getCategories = async (req, res) => {
  try {
    const listOfCategories = await Category.find({});

    res.status(200).json({
      success: true,
      data: listOfCategories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

const putCategory = async (req, res) => {
  const { id } = req.params;
  const { categoryTitle, mainCategoryId } = req.body;
  try {
    let foundCategory = await Category.findById(id);
    const foundMainCategory = await MainCategory.findById(mainCategoryId);

    if (!foundCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found!",
      });
    } else {
      foundCategory.categoryTitle =
        categoryTitle || foundCategory.categoryTitle;
      foundCategory.mainCategory =
        foundMainCategory || foundCategory.mainCategory;

      await foundCategory.save();
      res.json({
        success: true,
        message: "Successfully updated category!",
        data: foundCategory,
      });
    }
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Error ocurred!",
    });
  }
};
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found!",
      });
    }

    await Category.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Category successfully deleted!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error occurred while deleting the category",
    });
  }
};

module.exports = {
  postCategory,
  getCategories,
  putCategory,
  deleteCategory,
};
