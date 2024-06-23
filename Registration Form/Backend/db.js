const mongoose = require('mongoose')

const mongoUrl =  'mongodb://localhost:27017/Register'

mongoose.connect(mongoUrl)

const db = mongoose.connection;

// default event listener for database connection
db.on('connected', () => {
    console.log('Connected to MongoDB server');
})
db.on('error', (err) => {
    console.error('MongoDB connecton error', err);
})
db.on('disconnected', () => {
    console.log('MongoDB disconnected');
})

module.exports =db