const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BotSchema = new Schema({
    data: {
        type: Array,
        default: [],
        required: false
    },
    sessionId: {
        type: String, 
        required: false
    }
})

module.exports = Item = mongoose.model('chats', BotSchema)