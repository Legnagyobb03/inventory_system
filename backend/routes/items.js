const express = require('express');
const Item = require('../models/Item');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');


const validateItemAndOwnership = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id).populate('createdBy', 'name email');
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    // Check if the user is the creator or an admin
    if (item.createdBy._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. You do not have permission to modify this item.' });
    }
    
    req.item = item; // Attach item to the request
    next();
  } catch (error) {
    console.error('Error validating item:', error.message);
    res.status(500).json({ error: 'Failed to validate item' });
  }
};

router.use(authMiddleware);


router.get('/', async (req, res) => {
  try {
    const items = await Item.find().populate('createdBy', 'name email');
    res.json(items || []);
  } catch (error) {
    console.error('Error fetching items:', error.message);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});


router.post('/', async (req, res) => {
  try {
    const { name, description, quantity, location } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required!' });
    }

    const item = new Item({
      name,
      description,
      quantity,
      location,
      createdBy: req.user.id,
    });

    const savedItem = await item.save();
    const populatedItem = await Item.findById(savedItem._id).populate('createdBy', 'name email');
    res.status(201).json(populatedItem);
  } catch (error) {
    console.error('Error creating item:', error.message);
    res.status(500).json({ error: 'Failed to create item.' });
  }
});


router.put('/:id', validateItemAndOwnership, async (req, res) => {
  try {
    const { name, description, quantity, location } = req.body;

    if (!name || quantity === undefined) {
      return res.status(400).json({ error: 'Name and quantity are required.' });
    }

    Object.assign(req.item, { name, description, quantity, location });
    const updatedItem = await req.item.save();
    res.json(updatedItem);
  } catch (error) {
    console.error('Error updating item:', error.message);
    res.status(500).json({ error: 'Failed to update item.' });
  }
});


router.delete('/:id', validateItemAndOwnership , async (req, res) => {
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

