const express = require('express');
const router = express();
const category = require('../controller/category');
const { authenticate } = require('../model/auth');

router.post('/addCategory', authenticate, category.addCategory);
router.get('/category', authenticate, category.data);
router.put('/updateCategory/:id', authenticate, category.updateCategory);
router.delete('/deleteCategory/:id', authenticate, category.deleteData);

module.exports = router;