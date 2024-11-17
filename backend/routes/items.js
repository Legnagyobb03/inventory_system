const express = require('express');

const Item = require('../models/Item');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/', async (req, res) => {
  try {
    const { name, description, quantity, location } = req.body;
    const item = new Item({ name, description, quantity, location, createdBy: req.user.userId });
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id',  async (req, res) => {
  try {
    const { name, description, quantity, location } = req.body;
    const item = await Item.findByIdAndUpdate(req.params.id, { name, description, quantity, location }, { new: true });
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id',  async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }r
});

module.exports = router;