const { response, request } = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const Produkbaru = require("../models/produk")
// const req = require("express/lib/request");
// const res = require("express/lib/response");

    let skincare =  [
                    //  {id: 1 , nama: 'emina' , jenis: 'facial wash' },
                    //  {id: 2 , nama: 'scarlet' , jenis: 'hand body' },
                ]

    module.exports = {

    index: function(request, response){
            let keyword = {}
            if (request.query.keyword) {
             keyword = {nama: {$regex: request.query.keyword}}
            }
             Produkbaru.find (keyword, "nama", function (error,skincare){
            if (error) 
            console.log (skincare)
             response.render('pages/produk/index',{skincare})
        })
       
    },
    show: function (request, response){
        const id = request.params.id
        Produkbaru.findById (id, function (error, data){
            if (error) console.log (error)
            console.log (data)
             response.render ('pages/produk/show', {skincare: data})
   
        })
        // const data = skincare.filter(skincare =>{
        //     return skincare.id == id
     },
    create: function (request, response) {
        response.render('pages/produk/create')
    },
    // tambah: function(request, respon){
    //     produk.push ({
    //         ID : req.body.id,
    //         namabarang : req.body.nama,
    //         jenis : req.body.jenis
    //     })
    //     res.redirect('/produk')
    // },
    tambah: function (request,response){
        const skincare = new Produkbaru ({
            nama: request.body.nama,
            jenis: request.body.jenis,
            harga: request.body.harga
        })
        skincare.save(function(error){
            if(error) return handleError (error)
            response.redirect('/produk')
        });
    },

    edit: function (request,response){
        const id = request.params.id
        Produkbaru.findById (id, function (error, data){
            if(error) console.log (error)
            response.render ('pages/produk/edit',{skincare: data})
        })
    }, 

    update: function (req,res){
        const _id = req.params._id
        const id = req.body.id
        const nama = req.body.nama
        const jenis = req.body.jenis
        const filter = { _id: _id };
        const update = {
            id: id,
            nama: nama,
            jenis: jenis,
        };
        Produkbaru.updateOne(filter, update, function (err){
            res.redirect('/produk')
        });
        
    },

    get: (function(request,response){
    if (skincare.length >0){
        response.json({
            status: true,
            data: skincare,
            methode: request.method,
            URL: request.url,
            tanggal: new Date()
        })
    }
    else {
        res.json ({
            status: false,
            massage: 'Data Item masih kosong'
        })
    }
    res.json(skincare)
    }), 
    tambahkan: function(req,res){
    skincare.push(req.body);
    res.send({
        status: true,
        data: skincare,
        massage: 'Data Item Skincare telah ditambahkan',
        method: req.method,
        url:req.url,
        tanggal: new Date()
    }) //tambah produk di database
},
hapus: function (req, res) {
    const id = req.params._id
    Produkbaru.deleteOne({_id: id}, function (err) {
        if (err) return console.log(err);
        res.redirect('/produk')
    });
},
    // put: (function(request, response) {
    //     const id = request.params.id
    //     Produkbaru.update(
    //         // get data from params URL
    //         { nama:request.params.nama },
    //         // get data from request body
    //         { 
    //             nama:request.body.nama,
    //             jenis: request.body.jenis, 
    //         },
    //         function(error, data) {
    //             if(error) console.log (error);
    //             response.render ('pages/produk/update',{skincare: data})
    //         });
    // })
// update: function(req,res){
//     const id = req.params.id
//         skincare.filter (skincare =>{
//                 if(skincare.id == id){
//                 skincare.id = id
//                 skincare.nama = req.body.nama
//                 skincare.jenis = req.body.jenis
//                 res.send({
//                     status: true,
//                     data: skincare,
//                     massage: 'Data item skincare telah di update',
//                     method: req.method,
//                     url: req.url,
//                     tanggal: new Date()
//                 })
//                 pesan = true
//                 return skincare
// }
// })
// if(pesan == false){
//     res.send({
//         status: false,
//         massage: 'Item tidak ditemukan'
//     })
// }
//      res.json(skincare)
// },
delete: function (req, res) {
    let found = skincare.find(function (item) {
        return item.id === parseInt(req.params.id);
    });

    if (found) {
        let targetIndex = skincare.indexOf(found);
        skincare.splice(targetIndex, 1)
        res.send({
            status: true,
            data: skincare,
            massage: 'Item telah dihapus',
            method: req.method,
            url: req.url,
            tanggal: new Date()

        }
        )
        pesan = true
    }
if (pesan == false){
    res.json({
        status: false,
        massage: 'item not found'
    })
}
   res.json(skincare)
}}
