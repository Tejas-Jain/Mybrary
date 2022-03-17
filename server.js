//IMPORTING ENVIRONMENT VARIABLE TO THE APPLICATION
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


const express = require('express')
const app = express()
// const bodyParser = require('body-parser')


//Importing and Connecting Views (Views Folder) 
const expressEjsLayouts = require('express-ejs-layouts')
app.set('view engine','ejs')
app.set('views', __dirname + '/views')
app.set('layout','layouts/layout')
app.use(expressEjsLayouts)
app.use(express.static('public'))


//Importing and Connecting Models
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true })
const db= mongoose.connection
db.on('error',error=> console.log(error))
db.once('open',()=>{
    console.log('Successfully Connected to Mongoose')
})



// //Mongoose Db practice Queries - Just Uncomment these to see them in Action
// const kittySchema = new mongoose.Schema({
//     name: String
// });
// // NOTE: methods must be added to the schema before compiling it with mongoose.model()
// kittySchema.methods.speak = function () {
//     const greeting = this.name
//       ? "Meow name is " + this.name
//       : "I don't have a name";
//     console.log(greeting);
// }
// const Kitten = mongoose.model('Kitten', kittySchema); 
// // Kitten.create({name:'tom'},{name: 'jerry'},{name:'bob'},(err)=>{if(err)return handleError(err,nam)});
// Kitten.create({name:'tom'},{name: 'jerry'},{name:'bob'},function(err, nam,man,sam){
//     if(err)return handleError(err)
//     console.log(nam.name)
//     console.log(man.name)
//     console.log(sam.name)
// });
// console.log(nam.name)
// console.log(man.name)
// console.log(sam.name)

// console.log(tom.name)
// const silence = new Kitten({ name: 'Silence' });
// silence.save((err)=>{
//     if(err) return console.error(err);
// })
// const fluffy = new Kitten({ name: 'fluffy' });
// fluffy.save(function (err, fluffy) {
//     if (err) return console.error(err);
//     console.log(silence.name)
// });
// Kitten.find(function (err, kittens) {
//     if (err) return console.error(err);
//     console.log(kittens);
// })
// Kitten.deleteMany({},function (error){
//     if(error) return console.error(error)
// })



// app.use(bodyParser.urlencoded({extended: false}))
// app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({extended: false}));



// IMPORTING AND USING CONTROLLER
const indexRouter = require('./routes/index')
app.use('/',indexRouter)
const authorRouter= require('./routes/author')
app.use('/author',authorRouter)
const bookRouter = require('./routes/book')
app.use('/book',bookRouter)


//Listening Our App on Port 3000 of LocalHost
app.listen(process.env.port || 3000)