module.exports.sql = {
  item: {
    searchByCategoryName: `
      SELECT 
        item.name,
        item.brand,
        item.price,
        category.name AS category
      FROM item
      LEFT JOIN category ON item.category = category.id
      WHERE LOWER(category.name) LIKE LOWER($1)
    `,

    mostSoldItem: `
      SELECT
        item.name,
        item.brand,
        category.name AS category
      FROM (
        SELECT 
          id, 
          total
        FROM (
          SELECT COUNT(*) total, item.id
          FROM store
          JOIN transaction ON store.id = transaction.store
          JOIN item_transactions__transaction_items tiit ON transaction.id = tiit.transaction_items
          JOIN item ON tiit.item_transactions = item.id
          WHERE store.id = $1
          GROUP BY item.id
        ) AS base_count
        ORDER BY total DESC
        LIMIT 1
      ) AS highest_item
      JOIN item ON highest_item.id = item.id
      JOIN category ON item.category = category.id
    `
  }
};
