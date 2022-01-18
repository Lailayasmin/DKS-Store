const mongoose = require ('mongoose')
const { Schema } = mongoose

const produkSchema = new Schema({
    nama: String,
    jenis:String,
    harga: String,
    img:{
        data: Buffer, contentType: String
    }
}, {timestamps: true})  
const Produkbaru = mongoose.model('Produkbaru', produkSchema)
module.exports = Produkbaru
