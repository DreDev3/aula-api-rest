const db = require('../models/ConnectDatabase');

class ContactRepository {
  async findAll() {
    const rows = await db.query(`SELECT contacts.*, categories.name as category_name 
      FROM contacts LEFT JOIN categories ON categories.id = contacts.category_id;`);

    return rows;
  }

  async findById(id) {
    const [row] = await db.query(
      `SELECT contacts.*, categories.name as category_name 
      FROM contacts LEFT JOIN categories ON categories.id = contacts.category_id where contacts.id = ?;`,
      [id]
    );

    return row;
  }

  create() {

  }

  update() {

  }

  async delete(id) {
    const deleteItem = await db.query(
      `DELETE FROM contacts WHERE id = ?`, [id]
    )

    return deleteItem;
  }
}

module.exports = new ContactRepository();