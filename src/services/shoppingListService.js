const { fakeDb, ShoppingListItem } = require("../db");
const { ItemAlreadyExistsError, ItemNotFoundError } = require("../errors");

const getItemList = () => {
  const listItems = Array.from(fakeDb.values());
  return listItems.map((item) => item.getDetailsWithCurrency());
};

const addItem = (itemName, price) => {
  if (fakeDb.has(itemName)) {
    throw new ItemAlreadyExistsError(itemName);
  } else {
    const addedItem = new ShoppingListItem(itemName, price);
    fakeDb.set(itemName, addedItem);
    return addedItem.getDetailsWithCurrency();
  }
};

const getItemDetails = (itemName) => {
  if (!fakeDb.has(itemName)) {
    throw new ItemNotFoundError(itemName);
  } else {
    const requestedItem = fakeDb.get(itemName);
    return requestedItem.getDetailsWithCurrency();
  }
};

const setItemDetails = (itemName, updatedName, updatedPrice) => {
  if (!fakeDb.has(itemName)) {
    throw new ItemNotFoundError(itemName);
  } else if (updatedName !== itemName && fakeDb.has(updatedName)) {
    throw new ItemAlreadyExistsError(itemName);
  } else {
    const itemToUpdate = fakeDb.get(itemName);
    if (updatedName !== undefined && updatedName !== itemName) {
      fakeDb.delete(itemName);
      itemToUpdate.name = updatedName;
      fakeDb.set(updatedName, itemToUpdate);
    }
    if (updatedPrice !== undefined && itemToUpdate.price !== updatedPrice) {
      itemToUpdate.price = updatedPrice;
    }
    return itemToUpdate.getDetailsWithCurrency();
  }
};

const deleteItem = (itemName) => {
  const deletionSuccessful = fakeDb.delete(itemName);
  if (deletionSuccessful) {
    return { message: `${itemName} deleted from the shopping list.` };
  } else {
    return {
      message: `Not deleted; ${itemName} was not on the shopping list.`,
    };
  }
};

module.exports = {
  getItemList,
  addItem,
  getItemDetails,
  setItemDetails,
  deleteItem,
};
