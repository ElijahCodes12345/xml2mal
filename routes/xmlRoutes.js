const express = require('express');
const router = express.Router();
const xmlController = require('../controllers/xmlController');

router.post('/convert', xmlController.uploadXML);
router.post('/download', xmlController.downloadXML);

module.exports = router;
