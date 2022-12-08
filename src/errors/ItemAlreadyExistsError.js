class ItemAlreadyExistsError extends Error {
  constructor(itemName, options) {
    super(`${itemName} is already on the shopping list.`, options);
    this.name = "ItemAlreadyExistsError";
    this.status = 409;
  }
}

module.exports = ItemAlreadyExistsError;
