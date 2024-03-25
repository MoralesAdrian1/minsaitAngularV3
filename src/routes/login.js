const router = require('express').Router();
const mongojs = require('mongojs');
const db = mongojs('mongodb://127.0.0.1:27017/minsaitAngular', ['user']);
const ObjectId = require('mongodb').ObjectId;


// Ruta de inicio de sesión


module.exports = router;
