const express = require('express')
const app = express()
const mongoose = require('mongoose');
require('dotenv').config();
const Book  = require('./models/books')

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
    res.send({Hảo:'Khùng'})
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

Book.create({title:"Sons of Achi",body:"Body text goes here..."})
.then( (data) => {
    if(data){
        res.send('added')
    }else{
        res.send('error')
    }
})
})

app.get('/books', async (req,res)=>{
   const book = await Book.find();
   if(book){
       res.json(book)
   }else{
       res.send('Something went wrong')
   }
})


// connectDB().then( ()=> {
//     app.listen(PORT, ()=>{
//         console.log(`listening on port ${PORT}`);
//     })
// })