require('dotenv').config()
const express= require('express')
const cors = require('cors')

require('./db/connection')
const router = require('./routes/routes')
const appmiddleware= require('./middleware/appmiddleware')

const server = express()

const PORT = 3000 || process.env.PORT

 server.use(cors())
 server.use(express.json()) 
 server.use(appmiddleware.appmiddleware)
 server.use(router)

 server.listen(PORT,()=>{
    console.log(`port number = ${PORT}`);
 })

//  http reqst using express

 server.get('/',(req,res)=>{
    res.send('get started')
  })

// server.post('/',(req,res)=>{
// res.send('post finished')
// })

// server.put('/',(req,res)=>{
//    res.send('put started')
// })

// server.delete('/',(req,res)=>{
//    res.send('delete started')
// })