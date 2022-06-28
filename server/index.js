const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const authRoute = require("./routes/auth")
const todoItemsRoute = require("./routes/todoItems")
const cors = require('cors')
const app = express()

const PORT = process.env.PORT || 5500
app.use(cors())
//connecting to database
mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> console.log("Database connected"))
.catch(err => console.log(err))

app.use(express.json())
app.use('/api/auth', authRoute)
app.use('/api/todoItems', todoItemsRoute)
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))