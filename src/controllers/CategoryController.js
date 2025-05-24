class CategoryController {
  index(req, res) {
    console.log(req.query);
    res.json({ message: 'Listar os categoria' });
  }

  show(req, res) {
    console.log(req.query);
    res.json({ message: '' });
  }

  store(req, res) {
    console.log(req.query);
    res.json({ message: '' });
  }

  update(req, res) {
    console.log(req.query);
    res.json({ message: '' });
  }

  delete(req, res) {
    console.log(req.query);
    res.json({ message: '' });
  }
}

module.exports = new CategoryController();