var express = require('express');
var router = express.Router();
var session = require('express-session');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connection;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ນ້ອຍອາໄຫລ່' });
});


module.exports = router;
