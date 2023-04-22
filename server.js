const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = 3000;
require('dotenv').config()
const peopleRouter = require('./routes/people')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser : true })
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to database'))

app.use(express.json())  //lets the server accept json 
app.use('/people', peopleRouter)

app.listen(PORT, () => console.log(`Server started on ${PORT}`))