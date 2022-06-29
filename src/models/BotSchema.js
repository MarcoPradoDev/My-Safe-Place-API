const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BotSchema = new Schema({
    age: {
        type: String,
        required: false
    },
    genere: {
        type: String,
        required: false
    },
    sessionId: {
        type: String, 
        required: false
    }
})

module.exports = Item = mongoose.model('chats', BotSchema)