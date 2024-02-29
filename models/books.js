const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    title: {
        type: String,
        required: true,
        },
        body: {
        type: String,
        required: true
        }
       }
       );
   
// export model
const User = mongoose.model('Book', UserSchema);
module.exports = User