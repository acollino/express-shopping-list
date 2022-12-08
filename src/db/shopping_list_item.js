const CURRENCY_SYMBOL = "$";

class ShoppingListItem {
  constructor(name, price) {
    this.name = name;
    this.price = Number(price);
  }

  getPrice() {
    return `${CURRENCY_SYMBOL}${this.price.toFixed(2)}`;
  }

  getDetailsWithCurrency() {
    return { name: this.name, price: this.getPrice() };
  }
}

module.exports = ShoppingListItem;
