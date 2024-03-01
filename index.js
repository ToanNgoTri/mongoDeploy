const express = require('express')
const app = express()
const mongoose = require('mongoose');
require('dotenv').config();
const Book  = require('./models/books')

const PORT = process.env.PORT || 3000;

mongoose.set('strictQuery',false);

const connectDB = async () =>{
    try{
        const conn =  await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongoDB Connect:${conn.connection.host}`);
    } catch (error){
        console.log(error);
        process.exit(1)
    }
}

app.get('/',(req,res)=>{
    res.send({tittle:'book'})
})

app.get('./addnote', async (req,res) =>{
//     try{
// await Book.insert(
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

Book.insert({title:"Sons of Achi",body:"Body text goes here..."})
.then( (data) => {
    if(data){
        res.send('succes')
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


connectDB().then( ()=> {
    app.listen(PORT, ()=>{
        console.log(`listening on port ${PORT}`);
    })
})