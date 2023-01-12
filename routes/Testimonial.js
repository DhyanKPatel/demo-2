const express = require('express');
const router = express();
const Testimonial = require('../controller/Testimonial');
const { authenticate } = require('../model/auth');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname)
    }
  })
  
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
      cb(null, true);
    }
    else {
      cb(null, false);
    }
  }
  
  const upload = multer({
    storage: storage,
    fileFilter: fileFilter
  });



  router.post('/addTestimonial', authenticate, upload.single('profile'), Testimonial.addtestimonial);
  router.get('/testimonial', authenticate, Testimonial.data);
  router.put('/updateTestimonial/:id', authenticate, upload.single('Image'), Testimonial.updateTestimonial);
  router.delete('/deleteTestimonial/:id', authenticate, Testimonial.deleteTestimonial);

module.exports = router;












































