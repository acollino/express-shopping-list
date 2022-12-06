/** Initial instructions tell us to use array for storage.
 * However, a Map of name-shoppingListItem pairs appears to be more appropriate:
 *  - Can easily prevent duplicate list entries
 *  - Simplifies retrieval for entry editing or deletion
 *  - If duplicate entries were meant to signify purchasing multiple items,
 *      a quantity property can be added to the shoppingListItem class
 */
global.items = new Map();

module.exports = items;
