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

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.post('/', async (req, res) => {
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
        var historyChat = docData
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