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

app.post('/', (req, res) => {
    // const {age} = req.body
    const newBot = new Bot({
        ...req.body
    }) 
    newBot.save().then(item => res.json(item))
})

app.listen(process.env.PORT || 5000, ()  => {
    console.log('uri => ', db)
   
})