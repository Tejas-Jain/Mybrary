const mongoose = require('mongoose')
const path = require('path')
const coverImageBasePath= 'uploads/bookCovers'
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    publishDate: {
        type: Date,
        required: true
    },
    createAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    pageCount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        default: "Enter the Description of book Here."
    },
    coverImageName: {
        type: String,
        required: true
    },
    authorName: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    }
})
bookSchema.methods.coverImagePath = function(){
    return path.join('/',coverImageBasePath,this.coverImageName)
}
module.exports = mongoose.model('Book',bookSchema)
module.exports.coverImageBasePath = coverImageBasePath