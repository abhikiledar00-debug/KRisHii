const Product =
  require("../models/Product");

// ADD PRODUCT
exports.addProduct =
  async (req, res) => {

    try {

      const {
        name,
        price,
        quantity,
        farmerId
      } = req.body;

      // IMAGE FROM CLOUDINARY
      const image =
        req.file.path;

      const newProduct =
        new Product({

          name,
          price,
          quantity,
          image,
          farmerId

        });

      await newProduct.save();

      res.status(201).json({

        message:
          "Product added successfully",

        product:
          newProduct

      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message
      });

    }
};

// GET PRODUCTS
exports.getProducts =
  async (req, res) => {

    try {

      const products =
        await Product.find();

      res.json(products);

    } catch (error) {

      res.status(500).json({
        message:
          error.message
      });

    }
};