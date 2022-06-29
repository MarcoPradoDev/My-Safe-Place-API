const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('config');

// Connect to DB
const db = config.get('mongoURI')
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: "1"})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));


const app = express()
const Bot = require('./src/models/BotSchema')

app.use(express.json())

app.post('/', async (req, res) => {
    // const {age} = req.body
    // console.log('req => ', req)
    const headers = req.headers
    console.log('headers 1=> ', req.headers)
    // console.log('headers 2=> ', req.get('kHeaders'))
    const sessionId = headers['x-watson-session-id'] 
    console.log('sessionId => ', sessionId)
    const filter = {sessionId: sessionId}
    let doc = await Bot.findOne(filter).exec()
    console.log('doc => ', doc)
    // Exist chat
    if (doc === null){
        const newBot = new Bot({
            sessionId: sessionId,
            ...req.body
        }) 
        doc = await newBot.save();
    } else {
        const update = {...req.body}
        doc = await Bot.findOneAndUpdate(filter, update)
    }
    console.log('doc saved => ', doc)
    res.json(doc)
})

app.listen(process.env.PORT || 5000, ()  => {
    console.log('uri => ', db)
})