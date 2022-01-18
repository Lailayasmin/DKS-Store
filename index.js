const express =require ('express');
const dafRouter = require('./router/produk');
const app = express();


app.use(express.json());
app.use(express.urlencoded({  extended: true  }));
app.use(dafRouter);

const mongoose = require('mongoose');
const { response } = require('express');
mongoose.connect('mongodb://localhost/kosmetik')
// .then(() => {
//     app.listen(3000, () => console.log('koneksi sukses'));
// })
// .catch(err => console.log(err));
const db = mongoose.connection
db.on ('error', function(){
    console.log ('koneksi gagal')
})
db.once('open', function (){
    console.log ('Koneksi berhasil')
})
app.listen(3000, function(){
    console.log('Server Berjalan')
})

//  var myLogger = function (req, res, next) {
//      console.log("LOGGED");
//      next();
//  };
 const requestTime = function (req, res, next) {
     date = new Date();
     console.log(date);
     next();
 };

app.use(requestTime);
app.set('view engine', 'ejs');
app.use(express.static('public'));

//  app.get("/", function (request, respon) {
//      const tanggal = "Selamat Datang di DKS Store </br>" +
//      "<p><small>Requested at : " + date + "</small>";
//      respon.send(tanggal);
//  })
//  app.use(myLogger);

// app.get("/", function (request, respon) {
//      respon.send("Selamat Datang Di DKS Kosmetik");
//  app.get('/barang', function(request,respon){
//       const DKS = {
//           idbarang : '1',
//           namabarang : 'emina',
//           jenis : 'facial wash'
//       }
//       respon.send(DKS)
//   })

  //methode respon redirect
//   app.get ('/about' , function(request,respon){
//       respon.redirect('/barang')
//   })
//   //respon not found
  app.get ('/about1', function (request,respon){
      respon.sendStatus(404)
  })        
    
    .post(async function (req, res) {
        const { id, name, mapel } = req.body
        const result = await db.query(`UPDATE master_guru SET Name='${name}', Mapel='${mapel}' WHERE GuruID='${id}'`)
        res.send(result)
    })
 //router
  app.route ('/item')
  .get(function(request,respon){
      respon.send('Tampilkan item') //menampilkan produk di browser
  })
  .post(function(request,respon){
      respon.send('tambah item') //tambah data produk di database
  })
  .put(function(request,respon){
      respon.send('update data item') //mengupdate data produk di database
  })
  .delete(function(request,respon){
      respon.send('delete data item') //menghapus data produk di database
  });

 app.get("/", function (request, response){
     const sp52 = {
         id: 3,
         nama: "makarizo",
         jenis: "Hair Tonic",
 };
 response.render('pages/index',{sp52: sp52})
 });

 app.get('/about', function(request,respon){
      respon.render('pages/about')
  })
//   app.post('/', function(request,respon){`
//       respon.send('berhasil menambahkan data barang baru')
//   })
  app.put('/barang', function(request,respon){
      respon.send('berhasil mengupdate data barang')
  })
  app.delete('/barang', function(request,respon){
      respon.send('berhasil menghapus data barang')
  })
  app.put('/barang/:id/:namabarang/:jenisbarang', function(request,respon){
     respon.send(request.params)
 });

