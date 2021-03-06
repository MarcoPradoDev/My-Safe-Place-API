const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

// Connect to DB
const db = config.get('mongoURI')
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: "1"})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));


const app = express()
app.use(cors());
const Bot = require('./src/models/BotSchema')
app.use(express.json())

app.post('/chats', async (req, res) => {
    console.log('headers => ', req.headers)
    console.log('body => ', req.body)
    // const headers = req.headers
    // const sessionId = headers['x-watson-session-id'] 
    // console.log('sessionId => ', sessionId)
    const {data, sessionId} = req.body
    const filter = {sessionId: sessionId}
    let doc = await Bot.findOne(filter).exec()
    // console.log('doc => ', doc)
    // Exist chat

    if (doc === null){
        const newBot = new Bot({
            sessionId: sessionId,
            data: [data]
        }) 
        doc = await newBot.save();
        console.log('new doc => ', doc)
    } else {
        var historyChat = doc.data
        historyChat.push(data)
        const update = {data: historyChat}
        doc = await Bot.findOneAndUpdate(filter, update)
        console.log('doc saved => ', doc)
    }
    res.json(doc)
})

app.listen(process.env.PORT || 5000, ()  => {
    console.log('uri => ', db)
})