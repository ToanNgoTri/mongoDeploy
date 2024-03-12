const express = require('express')
const app = express()
const mongoose = require('mongoose');
require('dotenv').config();
const Book  = require('./models/books')
const datas = require('./data.json')
const PORT = process.env.PORT || 3000;

mongoose.set('strictQuery',false);

// const connectDB = async () =>{
//     try{
//         const conn =  await mongoose.connect(process.env.MONGO_URI);
//         console.log(`mongoDB Connect:${conn.connection.host}`);
//     } catch (error){
//         console.log(error);
//         process.exit(1)
//     }
// }

mongoose
  .connect((process.env.MONGO_URI))
  .then(() => console.log(`mongoDB Connected`))
  .catch( (err) => console.log(err))

  app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
})


app.get('/',(req,res)=>{
    res.send({Hảo:'Khùng'});
})

app.get('/addnote',  (req,res) =>{
//     try{
// await Book.create(
//     {
//     title:"Sons of Achi",
//     body:"Body text goes here...",
//     })    ;
// res.send('add data...')
//     }
//  catch (error){
//         console.log(error);
//         process.exit(1)
//     }

let input = datas[Math.floor(Math.random() * 7)];
Book.create(input)
.then( (data) => {
    if(data){
        res.send(`'added '.${data}`)
    }else{
        res.send('error')
    }
})
})

app.get('/books', async (req,res)=>{
   const book = await Book.find({},{_id:0});
   if(book){
       res.json(book)
   }else{
       res.send('Something went wrong')
   }
})

app.get('/delete',  (req,res) =>{

Book.deleteMany({})
.then( (data) => {
    if(data){
        res.send('deleted')
    }else{
        res.send('error')
    }
})
})

// connectDB().then( ()=> {
//     app.listen(PORT, ()=>{
//         console.log(`listening on port ${PORT}`);
//     })
// })