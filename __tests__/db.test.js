const { fakeDb, ShoppingListItem, changeItemName } = require("../src/db");

const ITEM_NAME = "Apple";
const ITEM_PRICE = 1.5;
const UPDATED_NAME = "Pear";
const CURRENCY_SYMBOL = "$";
const formattedPrice = `${CURRENCY_SYMBOL}${ITEM_PRICE.toFixed(2)}`;

function createTestItem() {
  return new ShoppingListItem(ITEM_NAME, ITEM_PRICE);
}

describe("ShoppingListItem", () => {
  const testingItem = createTestItem();

  test("should return a string in the format '$#.__' from getPrice", () => {
    expect(testingItem.getPrice()).toBe(formattedPrice);
  });

  test("should return an object with its name and formatted price from getDetailsWithCurrency", () => {
    expect(testingItem.getDetailsWithCurrency()).toEqual({
      name: ITEM_NAME,
      price: formattedPrice,
    });
  });
});

describe("fakeDb", () => {
  beforeEach(() => {
    fakeDb.clear();
    fakeDb.set(ITEM_NAME, createTestItem());
  });

  test("should change item's name and its key in the Map using changeItemName", () => {
    changeItemName(ITEM_NAME, UPDATED_NAME);

    const updatedItem = fakeDb.get(UPDATED_NAME);

    expect(updatedItem.name).toBe(UPDATED_NAME);
    expect(updatedItem.price).toBe(ITEM_PRICE);
    expect(fakeDb.get(ITEM_NAME)).toBeUndefined();
  });
});
