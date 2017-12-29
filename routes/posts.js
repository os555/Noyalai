var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './uploads'});

var Product = require('../models/post');

router.get('/', function(req, res, next){
    var items = Product;
    items.find({}, function(err, items){
        res.render('list', {
            title: 'ສິນຄ້າທັງໝົດ',
            items: items
        });
    });
});

router.get('/edit/:id', function(req, res, next){
    var items = Product;
    items.findById(req.params.id, function(err, item){
        res.render('edit', {
            title: 'ນ້ອຍອາໄຫລ່',
            item: item
        });
    });
});

/* GET home page. */
router.get('/add', function(req, res, next) {
  res.render('add', { title: 'ນ້ອຍອາໄຫລ່' });
});

router.post('/search', function(req, res, next){
    var name = req.body.name;
    var items = Product;
    var regex = new RegExp(name, 'i');  
    items.find({name: regex}, function(err, items){
        res.render('index', {
            title: "ນ້ອຍອາໄຫລ່",
            items: items,
            keyword: name
        });
    });
});

router.post('/add', upload.single('productImg'), function(req, res, next){
    var name = req.body.name;
    var price = req.body.price;
    var measure = req.body.measure;
    if(req.file){
        var productImg = req.file.filename;
    }else{
        var productImg = "noimage.jpg";
    }

    //check errors
    var errors = req.validationErrors();
    if(errors){
        res.render('add', {
            errors:errors
        });
    }else{
        var newProduct = new Product({
            name: name,
            price: price,
            measure: measure,
            productimage: productImg
        });

        Product.createProduct(newProduct, function(err, product){
            if(err) throw err;
            console.log(product);
        });

        req.flash('success', 'ເພີ່ມສິນຄ້າຮຽບຮ້ອຍແລ້ວ!');

        res.location('/posts/add');
        res.redirect('/posts/add');

    }

});

router.post('/edit/:id', upload.single('productImg'), function(req, res, next){
    var name = req.body.name;
    var price = req.body.price;
    var measure = req.body.measure;
    var img = req.body.img;
    if(req.file){
        var productImg = req.file.filename;
    }else{
        var productImg = img;
    }

    const doc = {
        name: name,
        price: price,
        measure: measure,
        productimage: productImg
    }

    

    Product.update({_id:req.params.id}, doc, {upsert:true}, function(err, raw){
        if(err) throw err;
        else console.log(raw);
    });

    req.flash('success', 'ແກ້ໄຂສິນຄ້າແລ້ວ!');
    res.location('/posts/edit/' + req.params.id);
    res.redirect('/posts/edit/' + req.params.id);
    
});

router.get('/delete/:id', function(req, res, next){
    var id = req.params.id;
    Product.remove({_id:req.params.id}, function(err,raw){
        if(err) throw err;
        else console.log(raw);
    });

    req.flash('success', 'ລຶບສິນຄ້າແລ້ວ');
    res.location('/posts/');
    res.redirect('/posts/');
});

module.exports = router;
