const { fakeDb, ShoppingListItem } = require("../db");
const { ItemAlreadyExistsError, ItemNotFoundError } = require("../errors");

const getItemList = () => {
  const listItems = Array.from(fakeDb.values());
  return listItems.map((item) => item.getDetailsWithCurrency());
};

const addItem = (name, price) => {
  if (fakeDb.has(name)) {
    throw new ItemAlreadyExistsError(name);
  } else {
    const addedItem = new ShoppingListItem(name, price);
    fakeDb.set(name, addedItem);
    return addedItem.getDetailsWithCurrency();
  }
};

const getItemDetails = (name) => {
  if (!fakeDb.has(name)) {
    throw new ItemNotFoundError(name);
  } else {
    const requestedItem = fakeDb.get(name);
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

const deleteItem = (name) => {
  const deletionSuccessful = fakeDb.delete(name);
  if (deletionSuccessful) {
    return { message: `${name} deleted from the shopping list.` };
  } else {
    return { message: `Not deleted; ${name} was not on the shopping list.` };
  }
};

module.exports = {
  getItemList,
  addItem,
  getItemDetails,
  setItemDetails,
  deleteItem,
};
