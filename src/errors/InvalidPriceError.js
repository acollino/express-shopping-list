class InvalidPriceError extends Error {
  constructor(price, options) {
    super(`${price} is not a number.`, options);
    this.name = "InvalidPriceError";
    this.status = 422;
  }
}

module.exports = InvalidPriceError;
