// routes/items.js
const router = require('express').Router();
const { getItems, createItem, deleteItem } = require('../controllers/items');
const auth = require('../middlewares/auth');

// Public list
router.get('/', getItems);

// Protected mutations
router.post('/', auth, createItem);
router.delete('/:itemId', auth, deleteItem);

module.exports = router;
