const express = require('express');
const router = express();
const contact = require('../controller/contact');
const { authenticate } = require('../model/auth');

router.post('/addContact', authenticate, contact.addContact);
router.get('/contact', authenticate, contact.data);
router.put('/updateContact/:id', authenticate, contact.updateContact);
router.delete('/deleteContact/:id', authenticate, contact.deleteContact);

module.exports = router;