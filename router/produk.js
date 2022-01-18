const { response } = require('express')
const express = require('express') 
const { route } = require('express/lib/application')
//const produk = require('../controllers/produk')
const router = express.Router()
const produkcontroller = require('../controllers/produk')
const Produkbaru = require("../models/produk")
const fs = require('fs');
var multer = require('multer');
var path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
const upload = multer({ storage: storage, limits: { fieldSize: 10 * 1024 * 1024} })

router.route('/produk')
.get(produkcontroller.index)
.post(upload.single('image'), (req, res, next) => {
    const produk = new Produkbaru({
        nama: req.body.nama,
        jenis: req.body.jenis,
        password: req.body.password,
        img: {
            data: fs.readFileSync(path.join(__dirname, '../' + '/uploads/' + req.file.filename)),
            contentType: 'image/jpg'
        }
    });
    produk.save(function (error){
        if (error) return handleError(error);
        res.redirect('/produk')
    })
})

router.get('/produk/create', produkcontroller.create)
router.get('/produk/:id', produkcontroller.show)
//router.get('/produk/create', produkcontroller.create)
router.get('/produk/:_id/hapus', produkcontroller.hapus)
router.get('/produk/:id/edit', produkcontroller.edit)
router.post('/produk/update/:_id', produkcontroller.update)
//router.delete('/produk/:id', produkcontroller.hapus)
//router.update('/produk/:id', produkcontroller.update)

//  router.route ('/produk') //syntax app.ganti dengan syntax router
//  .get(function(request,respon){
//      respon.send('Tampilkan produk') // menampilkan produk pada browser
//  })

//  router.delete('/produk/:id', function(request,respon){
//      const id = request.params
//      respon.send(id) // delete data produk di database
//  })

module.exports = router