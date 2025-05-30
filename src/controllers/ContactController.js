const ContactRepository = require('../repositories/ContactRepository');

class ContactController {
  async index(req, res) {
    const contacts = await ContactRepository.findAll();
    res.json(contacts);
    console.log(contacts);
  }

  async show(req, res) {
    const { id } = req.params;

    const contact = await ContactRepository.findById(id);

    if (!contact) return req.status(404).json({ error: 'Contato não encontrado!' });

    res.json(contact);
  }

  async store(req, res) {
    const { name, email, phone, category_id } = req.body;

    if (!name) return res.status(400).json({ error: 'Nome é um campo obrigatorio' });

    if (email) {
      const contactByEmail = await ContactRepository.findByEmail(email);

      if (contactByEmail) {
        return res.status(400).json({ error: 'Esse e-mail já está cadastrado!' })
      }

    }

    const contact = ContactRepository.create({
      name,
      email: email || null,
      phone: phone || null,
      category_id: category_id || null
    });

    res.status(201).json(contact);
  }

  async update(req, res) {
    const { id } = req.params;

    const contact = await ContactRepository.update(id);

    if (!contact) return req.status(404).json({ error: 'Contato não encontrado!' })

    res.json(contact);
  }

  async delete(req, res) {
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: "ID de contato inválido!" });

    await ContactRepository.delete(id);

    res.sendStatus(204);
  }
}

module.exports = new ContactController();