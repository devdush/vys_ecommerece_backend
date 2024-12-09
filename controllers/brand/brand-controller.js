const Brand = require("../../models/Brand");

const postBrand = async (req, res) => {
  const brandTitle = req.body.brandTitle;
  const imageUrl = req.body.imageUrl;
  try {
    const newBrand = new Brand({
      brandTitle,
      imageUrl
    });
    await newBrand.save();
    res.status(201).json({
      success: true,
      data: newBrand,
    });
  } catch (error) {
    if (error.errorResponse.code === 11000) {
      res.json({
        success: false,
        message: `The category title "${brandTitle}" already exists. Please choose a unique title.`,
      });
    } else {
      res.json({
        success: false,
        message: "Error occurred",
      });
    }
  }
};
const getBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const foundBrand = await Brand.findById(id);

    if (!foundBrand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found",
      });
    } else {
      return res.status(200).json({
        success: true,
        data: foundBrand,
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
const getBrands = async (req, res) => {
  try {
    const listOfBrands = await Brand.find({});
    res.status(200).json({
      success: true,
      data: listOfBrands,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};
const putBrand = async (req, res) => {
  try {
  } catch (error) {}
};
const deleteBrand = async (req, res) => {
  try {
  } catch (error) {}
};
module.exports = {
  postBrand,
  getBrand,
  getBrands,
  putBrand,
  deleteBrand,
};
