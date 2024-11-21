const express = require('express');
const Item = require('../models/Item');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items || []);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, description, quantity, location } = req.body;
    if (!name || !quantity) {
      return res.status(400).json({ error: 'Name and quantity are required' });
    }

    const item = new Item({ name, description, quantity, location });
    const savedItem = await item.save();
    console.log('Item saved:', savedItem);
    res.status(201).json(savedItem);
  } catch (error) {
    console.error('Error saving item:', error);
    res.status(500).json({ error: 'Failed to create item' });
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
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json(item);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'Failed to update item' });
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
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

module.exports = router;

