const razorpay =
  require("../config/razorpay");

exports.createOrder =
  async (req, res) => {

    try {

      const options = {

        amount:
          req.body.amount * 100,

        currency: "INR"

      };

      const order =
        await razorpay.orders.create(
          options
        );

      res.json(order);

    } catch (error) {

      res.status(500).json({
        message:
          error.message
      });

    }
};