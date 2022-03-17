const express = require('express')
const router = express.Router()
const Author = require('../models/authors')

//All Authors Route
router.get('/SearchAuthor', async (req, res) => {    //Function written  in Async Await form with the root function have one callback of (req,res)=>{}
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
      searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
      const authors = await Author.find(searchOptions)
      res.render('author/SearchAuthor', {
        authors: authors,
        searchOptions: req.query
      })
    } catch {
      res.redirect('author/SearchAuthor')
    }
})
  
router.get('/AddAuthor', (req, res) => {
    res.render('author/AddAuthor', { author: new Author() })
})

router.post('/AddAuthor', (req,res)=>{      //(req,res)=> this is a callback function passed to inbuilt function .post in arrow form
    const author= new Author({              // This will be Synchronous Process Since it is not a function.
        name: req.body.name
    })
    author.save((err,newAuthor)=>{         //(err,newAuthor)=> is a callback function passed to the system function .save in arrow form
        if(err){ 
            res.render('author/AddAuthor',{
                author: author,
                message: 'Error creating Author'
            })
        }else{
            res.render('author/AddAuthor',{
              message: 'New Author Created Successfully'              
            })
        }
    })
})
module.exports= router


//So final Working Rule for Ordering the Async Functions:-
//1. Made the callback of root function.
//2. Mostly(I have seen it almost always) Async-Await + try-catch combination
//   is used for all Async Functions which are inside the Parent function.