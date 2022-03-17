const express = require('express')
const router = express.Router()
const Book = require('../models/book')
router.get('/',async(req,res)=>{
    try{
    const books = await Book.find().sort('createAt').limit(10).exec()
    res.render('index',{
        books: books
    })   
    }catch(error){
        console.log(error)
        res.redirect('book/SearchBook')
    }
})
module.exports = router