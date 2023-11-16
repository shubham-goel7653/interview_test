require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

const bodyParser = require("body-parser");
const {customLogger,apiResponseTime} = require('./helpers/logger')
const {routes} = require('./routes/index')


app.use(bodyParser.json());
app.use(customLogger)
app.use(apiResponseTime)

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

app.use('/user',routes.userRoute)

mongoose.connect(process.env.DB_URL,connectionParams)
  .then(() => {
    app.listen(process.env.PORT,(err) => {
        if(err) console.log("error occur while listening",process.env.PORT)
        console.log("server running successfully")
    })
  })
  .catch((error) => {
    console.log('error in mongoConnection',error)
  })

mongoose.connection.on('connected',()=>{
  console.log('MongoDB is connected')
})

mongoose.connection.on('disconnected',()=>{
  console.log('MongoDB is not connected')
})

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});