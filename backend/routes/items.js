const express = require('express');
const Item = require('../models/Item');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
      const items = await Item.find();
      res.json(items || []);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  console.log('POST /api/items', req.body); // Debugging log
  try {
    const { name, description, quantity, location } = req.body;
    if (!name || !quantity) {
      return res.status(400).json({ error: 'Name and quantity are required' });
    }

    const item = new Item({ name, description, quantity, location });
    await item.save();
    console.log('Item saved:', item); // Debugging log
    res.status(201).json(item);
  } catch (error) {
    console.error('Error saving item:', error.message); // Debugging log
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { name, description, quantity, location } = req.body;

    if (!name || !quantity) {
      return res.status(400).json({ error: 'Name and quantity are required' });
    }

    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { name, description, quantity, location },
      { new: true } // Return the updated document
    );

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json(item);
  } catch (error) {
    console.error('Error updating item:', error.message); // Debugging log
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findByIdAndDelete(id);

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(200).json({ message: 'Item deleted successfully', item });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;