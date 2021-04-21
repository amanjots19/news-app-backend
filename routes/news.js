var express = require('express');
var router = express.Router();

var newsController = require('../controller/newsApp');

/* GET users listing. */
router.get('/news', newsController.getNews);

router.put('/save', newsController.postSave);

router.post('/savedarticles', newsController.postDatafromSourcename);

module.exports = router;
