const WarrantyService = require("../../models/WarrantyService");

const postWarrantyService = async (req, res) => {
    const duration = req.body.duration;
    const imageUrl = req.body.imageUrl;
    try {
      const newWarranty = new WarrantyService({
        duration,
        imageUrl
      });
      await newWarranty.save();
      res.status(201).json({
        success: true,
        data: newWarranty,
      });
    } catch (error) {
      if (error.errorResponse.code === 11000) {
        res.json({
          success: false,
          message: `The Duration "${duration}" already exists. Please choose a unique Duration.`,
        });
      } else {
        res.json({
          success: false,
          message: "Error occurred",
        });
      }
    }
  };
  const getWarranty = async (req, res) => {
    try {
      const listOfWarranty = await WarrantyService.find({});
      res.status(200).json({
        success: true,
        data: listOfWarranty,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error occurred",
      });
    }
  };
  module.exports = {
    postWarrantyService,
    getWarranty
  };
  