const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const errorHandler = require('./middleware/ErrorHandling')
authRouter = require("./routes/auth");
const port = 3000

dotenv.config()
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("database connected"))
    .catch((err) => console.log(err))

app.use(express.json({limit: "10mb"}))
app.use(express.urlencoded({limit: "10mb", extended: true}))
app.use(errorHandler)

// localhost:5003/api/register
app.use('/api', authRouter)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${process.env.PORT}!`))