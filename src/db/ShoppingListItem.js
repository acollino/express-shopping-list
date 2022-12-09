const CURRENCY_SYMBOL = "$";

class ShoppingListItem {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  getPrice() {
    return `${CURRENCY_SYMBOL}${Number(this.price).toFixed(2)}`;
  }

  getDetailsWithCurrency() {
    return { name: this.name, price: this.getPrice() };
  }
}

module.exports = ShoppingListItem;
