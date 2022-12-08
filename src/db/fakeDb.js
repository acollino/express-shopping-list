/** Initial instructions tell us to use array for storage and save it globally.
 * However, a Map of name-shoppingListItem pairs appears to be more appropriate:
 *  - Can easily prevent duplicate list entries
 *  - Simplifies retrieval for entry editing or deletion
 *  - If duplicate entries were meant to signify purchasing multiple items,
 *      a quantity property can be added to the shoppingListItem class
 */
const fakeDb = new Map();

function changeItemName(itemNameOld, itemNameNew) {
  const itemToUpdate = fakeDb.get(itemNameOld);
  if (itemNameNew !== undefined && itemNameNew !== itemNameOld) {
    fakeDb.delete(itemNameOld);
    itemToUpdate.name = itemNameNew;
    fakeDb.set(itemNameNew, itemToUpdate);
  }
  return itemToUpdate;
}

module.exports = {
  fakeDb,
  changeItemName,
};
