const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BotSchema = new Schema({
    question_1_1: {
        type: String,
        required: false
    },
    question_1_2: {
        type: String,
        required: false
    },
    question_1_3: {
        type: String, 
        required: false
    },
    sessionId: {
        type: String, 
        required: false
    }
})

module.exports = Item = mongoose.model('chats', BotSchema)