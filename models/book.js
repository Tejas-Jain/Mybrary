const mongoose = require('mongoose')
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
    coverImage: {
        type: Buffer,
        required: true
    },
    coverImageType: {
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
    if(this.coverImageType!=null && this.coverImage!= null)
    return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')} `
}
module.exports = mongoose.model('Book',bookSchema)