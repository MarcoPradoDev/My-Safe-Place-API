const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BotSchema = new Schema({
    age: {
        type: String,
        required: false
    },
    user_id: {
        type: String, 
        required: false
    }
})

module.exports = Item = mongoose.model('chats', BotSchema)