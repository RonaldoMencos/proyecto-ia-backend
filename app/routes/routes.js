const express = require('express');
const router = express.Router();
const AnalizarTexto = require('../controller/analizarTexto.js');

router.post('/analize', AnalizarTexto.generateContent);
router.get('/get-data', AnalizarTexto.getData);

module.exports = router;