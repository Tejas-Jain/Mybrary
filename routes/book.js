const express = require('express')
const router = express.Router()
const Book = require('../models/book')
const Author = require('../models/authors')
const path = require('path')
const imgMimeTypes = ['image/jpeg','image/png','image/gif']

//Getting /book/AddBook Routes
router.get('/AddBook',async (req,res)=>{
    const books = new Book()
    renderNewPage(res,books)
})


//Getting /book/SearchBook Routes
router.get('/SearchBook',async (req,res)=>{
    try{
        let query = Book.find()
        if(req.query.title!=null && req.query.title !=''){
            query = query.regex('title', new RegExp(req.query.title,'i'))
        }
        if(req.query.publishBefore!=null && req.query.publishBefore !=''){
            query = query.lte('publishDate',req.query.publishBefore)
        }
        if(req.query.publishAfter!=null && req.query.publishAfter !=''){
            query = query.gte('publishDate',req.query.publishAfter)
        }
        const books = await query.exec()
        res.render('book/SearchBook',{
            books: books,
            searchOptions: req.query
        })
    }catch(error){
        console.log(error)
        res.render('book/SearchBook',{
            books: [],
            message: 'Unable to Find Something Based on Input Parameters',
            searchOptions: req.query
        })
    }
})

//Storing New Book Data to Database through book Model
router.post('/AddBook',async (req,res)=>{
    const book = new Book({
        title: req.body.title,
        publishDate: new Date(req.body.publishDate),
        pageCount: req.body.pageCount,
        description: req.body.description,
        authorName: req.body.authorName,
    })
    saveCover(book, req.body.cover)

    try{
        const newBook = await book.save()
        var books = new Book()
        message='New Book Created Successfully'
        renderNewPage(res,books,message)
    }
    catch{                                                          //, and simplest form of them use atleast 3-4 lines
        var message= 'Error Creating the New Book, Please Check the Entered Data!!!'//So its best to use Simple Callback here
        renderNewPage(res,book,message)
    }
})

//function to render Add Book Page
async function renderNewPage(res,books,message = ''){
    try{
        const authors = await Author.find({})
        res.render('book/AddBook',{
            authors: authors,
            book: books,
            message: message
        })
    }
    catch{
        console.log(error)
        console.log("Adding Book Not Available")
        res.redirect('book/SearchBook')
    }
}

//function to save encoded CoverImage Received as FilePond JASON String Object
function saveCover(book, encodedCover){
    if(encodedCover== null) 
        return
    const cover = JSON.parse(encodedCover)
    if(cover != null && imgMimeTypes.includes(cover.type)){
        book.coverImage = new Buffer.from(cover.data,'base64')
        book.coverImageType = cover.type
    }
    return
}

module.exports = router