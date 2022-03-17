
// //-----Functions  which runs Asynchronously, and  there is an Delay in the execution of function
// //-----Here third function will execute first than second than first 
// //-----But we want First , than second than third function i.e. Alter in any required order irrespective of Loading time.
// var first = ()=>{
//   setInterval(()=>{
//     console.log(`First Function `)
//   },6000)
// }   
// var second = ()=>{
//     setInterval(function callback(message="Second Function"){
//       console.log(message)
//     },5000)
// }
// var third =()=>{
//   setInterval(()=>{
//     console.log("Third Function")
//   },4000)
// } 
// first()
// second()
// third()



// //---------METHOD 1--------------
// //--------Trying to Alter Order without Callback Function.
// //-------Surprisingly it worked, Also by this method we were saved from CALLBACK HELL.
// //------Than why we required METHOD 2 at all.
// var first = ()=>{
//       setTimeout(()=>{
//         console.log(`First Function `)
//         second();
//       },3000)
//     }   
// var second = ()=>{
//         setTimeout(function callback(message="Second Function"){
//           console.log(message)
//           third()
//         },2000)
//     }
// var third =()=>{
//       setTimeout(()=>{
//         console.log("Third Function")
//       },1000)
//     } 
// first()






// //---------METHOD 2------------------
// //-----Finally Applying Callback technique to Alter Order----
// //---------METHOD 2 is giving the exact same result as Method 1 
// //-----But with the complications of passing the functions as CallBacks
// var first = (second,third)=>{
//   setTimeout(()=>{
//     console.log(`First Function `)
//     second(third)
//   },8000)
// }   
// var second = (third)=>{
//     setTimeout(function callback(message="Second Function"){
//       console.log(message)
//       third()
//     },4000)
// }
// var third =()=>{
//   setTimeout(()=>{
//     console.log("Third Function")
//   },3000)
// } 
// first(second,third)


// // So Finally WHY we required to pass the functions as Callback 
// // as this is making the program complicated(Callback HELL) 
// // SOLUTION: this is because the function declaration as available 
// // to us will not be available to us most of the used system functions like in Node.js and MongoDB the most function 
// // we are calling are inbuilt
// // so how the function will know that which our's function we want it run after the exection of that function 
// // THIS IS EXACTLY why we use Callbacks through callback we will send the function the name of our function which we want to execute at last and
// // the most functions by default place Callback function in the end of the function in its declartion to run that at last, They even pass a error 
// // to our callback function in case we want to use it.
// // ALSO the inbuilt function we are calling and sending our callback, doesn't know how many functions we are going to make for the 
// // Callbacks so it by default places just accept one callback function and other CallBack function can be send to the call back to the first
// //First Callback function this is this that actually leads to CallBack HELL

// // So the Correct Call Back Method of Our Example is 
// //--------METHOD 3
// var first = (second)=>{
//   setTimeout(()=>{
//     console.log(`First Function `)
//     second(third)
//   },8000)
// }   
// var second = (third)=>{
//     setTimeout(function callback(message="Second Function"){
//       console.log(message)
//       third()
//     },4000)
// }
// var third =()=>{
//   setTimeout(()=>{
//     console.log("Third Function")
//   },3000)
// } 
// first(second)
// //----------Done---------------
// //May be there are 2 callback functions for the inbuilt functions one for something 
// //which gets executed when function run successfully
// //and other when encountered an error

//Final Note: As can be easily observed from above the Callbacks, promises, Async-Await are made by INBUILT FUNCTIONS
// WE JUST USE THEM DURING THEIR INVOCATION AND RARELY MADE THESE STRUCTURES






































































// function last(msg){
//   console.log(`This function will be printed at the ${msg} of all `)
// }
// function watchTutorialCallback() {
//     let userLeft = false
//     let userWatchingCatMeme = true
//     console.log('Now the function watch tutorial is running')
//     if (userLeft) {
//       // errorCallback({
//       //   name: 'User Left', 
//       //   message: ':('
//       // })
//     } else if (userWatchingCatMeme) {
//       // errorCallback('error message')
//     } else {
//       callback('Thumbs up and Subscribe')
//     }
//     // last('hello')
// }









// setInterval(function errorCallback(error='error message'){
//   console.log(error.name + ' ' + error.message)
// }, 3000)
// watchTutorialCallback()


//   function watchTutorialPromise() {
//     let userLeft = false
//     let userWatchingCatMeme = false
//     return new Promise((resolve, reject) => {
//       if (userLeft) {
//         reject({
//           name: 'User Left', 
//           message: ':('
//         })
//       } else if (userWatchingCatMeme) {
//         reject({
//           name: 'User Watching Cat Meme',
//           message: 'WebDevSimplified < Cat' 
//         })
//       } else {
//         resolve('Thumbs up and Subscribe')
//       }
//     })
//   }
  

  
//   watchTutorialPromise().then(message => {
//     console.log(message)
//   }).catch(error => {
//     console.log(error.name + ' ' + error.message)
//   })
  
//   const recordVideoOne = new Promise((resolve, reject) => {
//     resolve('Video 1 Recorded')
//   })
  
//   const recordVideoTwo = new Promise((resolve, reject) => {
//     resolve('Video 2 Recorded')
//   })
  
//   const recordVideoThree = new Promise((resolve, reject) => {
//     resolve('Video 3 Recorded')
//   })
  
//   Promise.all([
//     recordVideoOne,
//     recordVideoTwo,
//     recordVideoThree
//   ]).then(messages => {
//     console.log(messages)
//   })
  
//   Promise.race([
//     recordVideoOne,
//     recordVideoTwo,
//     recordVideoThree
//   ]).then(message => {
//     console.log(message)
//   })