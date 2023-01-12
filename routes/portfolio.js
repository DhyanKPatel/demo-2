const express = require('express');
const router = express();
const portfolio = require('../controller/portfolio');
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


// router.post('/portfolio', authenticate, upload.array('uploadImage'), portfolio.addData);
router.post('/addPortfolio', authenticate, upload.array('profile', 5), portfolio.addportfolio);
router.get('/portfolio', authenticate, portfolio.data);
router.put('/updatePortfolio/:id', upload.array('profile', 5), authenticate, portfolio.updatePortfolio);
router.delete('/deletePortfolio/:id', authenticate, portfolio.deletePortfolio);
router.delete('/portfolio/multiple', authenticate, portfolio.multipleDelete);

module.exports = router;
















































// router.post('/addPortfolio', authenticate, upload.array('profile', 12), portfolio.addportfolio);
// router.get('/portfolio', authenticate, portfolio.data);
// router.post('/updatePortfolio/:id', upload.array('profile', 12), authenticate, portfolio.updatePortfolio);
// router.get('/deletePortfolio/:id', authenticate, portfolio.deletePortfolio)