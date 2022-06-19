const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BotSchema = new Schema({
    age: {
        type: Number,
        required: false
    }
})

module.exports = Item = mongoose.model('chats', BotSchema)