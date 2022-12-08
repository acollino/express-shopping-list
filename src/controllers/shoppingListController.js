const { shoppingListService } = require("../services");

const getItemList = (req, res, next) => {
  try {
    res.json(shoppingListService.getItemList());
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const addItem = (req, res, next) => {
  try {
    const { name, price } = req.body;
    const addedItem = shoppingListService.addItem(name, price);
    res.json({ added: addedItem });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const getItemDetails = (req, res, next) => {
  try {
    const name = req.params.name;
    const requestedItem = shoppingListService.getItemDetails(name);
    res.json(requestedItem);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const setItemDetails = (req, res, next) => {
  try {
    const { name, price } = req.body;
    const updatedItem = shoppingListService.setItemDetails(
      req.params.name,
      name,
      price
    );
    res.json({ updated: updatedItem });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const deleteItem = (req, res, next) => {
  try {
    const name = req.params.name;
    res.json(shoppingListService.deleteItem(name));
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports = {
  getItemList,
  addItem,
  getItemDetails,
  setItemDetails,
  deleteItem,
};
