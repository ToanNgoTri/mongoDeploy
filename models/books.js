const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: {
        type: Number,
        required: true,
        },
        name: {
        type: String,
        required: true
        }
       },{versionKey:false});
     
   
// export model
const User = mongoose.model('Book', UserSchema);
module.exports = User