const { fakeDb, shoppingListItem } = require("../db");

const getItemList = () => {
  const listItems = Array.from(fakeDb.values());
  return listItems.map((item) => item.getDetailsWithCurrency());
};

const addItem = (name, price) => {
  if (fakeDb.has(name)) {
    throw new Error(`${name} is already on the shopping list.`);
  } else {
    const addedItem = new shoppingListItem(name, price);
    fakeDb.set(name, addedItem);
    return addedItem.getDetailsWithCurrency();
  }
};

const getItemDetails = (name) => {
  if (!fakeDb.has(name)) {
    throw new Error(`${name} is not on the shopping list.`);
  } else {
    const requestedItem = fakeDb.get(name);
    return requestedItem.getDetailsWithCurrency();
  }
};

const setItemDetails = (itemName, updatedName, updatedPrice) => {
  if (!fakeDb.has(itemName)) {
    throw new Error(`${itemName} is not on the shopping list.`);
  } else if (updatedName !== itemName && fakeDb.has(updatedName)) {
    throw new Error(`${updatedName} is already on the shopping list.`);
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
