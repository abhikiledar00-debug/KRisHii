const Order =
  require("../models/Order");

// CREATE ORDER
exports.createOrder =
  async (req, res) => {

    try {

      const {
        productName,
        quantity,
        price,
        retailerName
      } = req.body;

      const order =
        new Order({
          productName,
          quantity,
          price,
          retailerName
        });

      await order.save();

      res.status(201).json({
        message:
          "Order placed successfully",
        order
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }
};

// GET ALL ORDERS
exports.getOrders =
  async (req, res) => {

    try {

      const orders =
        await Order.find();

      res.json(orders);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }
};

// ACCEPT ORDER
exports.acceptOrder =
  async (req, res) => {

    try {

      const { id } = req.params;

      const updatedOrder =
        await Order.findByIdAndUpdate(

          id,

          {
            status: "Accepted",
            transporter: "Transporter"
          },

          { new: true }
        );

      res.json(updatedOrder);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }
};
exports.completeOrder =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const updatedOrder =
        await Order.findByIdAndUpdate(

          id,

          {
            status:
              "Delivered"
          },

          { new: true }
        );

      res.json(
        updatedOrder
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message
      });

    }
};