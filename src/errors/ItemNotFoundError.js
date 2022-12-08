class ItemNotFoundError extends Error {
  constructor(itemName, options) {
    super(`${itemName} is not on the shopping list.`, options);
    this.name = "ItemNotFoundError";
    this.status = 409;
  }
}

module.exports = ItemNotFoundError;
