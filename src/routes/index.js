const express = require("express");
const router = express.Router();
const { shoppingListController } = require("../controllers");

// Could use router.param("name", getItemFunction) before the other routes

router
  .route("/items")
  .get(shoppingListController.getItemList)
  .post(shoppingListController.addItem);

router
  .route("/items/:name")
  .get(shoppingListController.getItemDetails)
  .patch(shoppingListController.setItemDetails)
  .delete(shoppingListController.deleteItem);

module.exports = router;
