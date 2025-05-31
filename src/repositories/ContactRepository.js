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

  async create({ name, email, phone, category_id }) {
    const register = await db.query(
      `INSERT INTO contacts (name, email, phone, category_id)
      VALUES (?, ?, ?, ?)`, [name, email, phone, category_id]
    )

    const insertedId = register.insertId;
    return {
      id: insertedId,
      name,
      email,
      phone,
      category_id,
    }
  }

  async update(id, { name, email, phone, category_id }) {
    const updateItem = await db.query(
      `UPDATE contacts
      set name = ?, email = ?, phone = ?, category_id = ?
      WHERE id = ?`,
      [name, email, phone, category_id, id]
    )

    return updateItem;
  }

  async delete(id) {
    const deleteItem = await db.query(
      `DELETE FROM contacts WHERE id = ?`, [id]
    )

    return deleteItem;
  }

  async findByEmail(email) {
    const [queryEmail] = await db.query(
      `SELECT * FROM contacts WHERE email = ?`, [email]
    )

    return queryEmail;
  }
}

module.exports = new ContactRepository();