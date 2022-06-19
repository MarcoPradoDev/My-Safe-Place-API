const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

// Connect to DB
const db = config.get('mongoURI')
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: "1"})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));


const app = express()
const Bot = require('./src/models/BotSchema')

app.use(express.json())

app.post('/', (req, res) => {
    const {age} = req.body
    const newBot = new Bot({
        age: age
    }) 
    newBot.save().then(item => res.json(item))
})

app.listen(3000, ()  => {
    console.log('uri => ', db)
   
})