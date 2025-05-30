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

  store(req, res) {
    console.log(req.query);
    res.json({ message: '' });
  }

  update(req, res) {
    console.log(req.query);
    res.json({ message: '' });
  }

  async delete(req, res) {
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: "ID de contato inválido!" });

    await ContactRepository.delete(id);

    res.sendStatus(204);
  }
}

module.exports = new ContactController();