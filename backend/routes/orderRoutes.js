const express =
  require("express");

const router =
  express.Router();

const {
  createOrder,
  getOrders,
  acceptOrder,
  completeOrder
} = require(
  "../controllers/orderController"
);

// CREATE
router.post(
  "/create",
  createOrder
);

// GET
router.get(
  "/",
  getOrders
);

// ACCEPT
router.put(
  "/accept/:id",
  acceptOrder
);

// COMPLETE
router.put(
  "/complete/:id",
  completeOrder
);

module.exports =
  router;