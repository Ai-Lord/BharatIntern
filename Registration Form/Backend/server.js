const express = require('express')
const app = express()
const cors = require('cors');
const Model=require('./model')

const db = require('./db')

app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.json()); 

app.post('/register', async (req,res)=>{
    try{
        const data = req.body
        const modelData = new Model(data)
        const response = await modelData.save()
        console.log('data saved')
        res.status(200).json({response});
    }
    catch(err){
        console.log(err)
      res.status(500).json({error: 'Internal server Error'})
    }
})

app.listen(3000, ()=>{
    console.log("Live at 3000")
})