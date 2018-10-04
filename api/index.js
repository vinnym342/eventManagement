const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const compression = require('compression');
const helmet = require('helmet');


//Init
require('./db/dbInit')

//Routes
const authRouter = require('./routes/auth')

// Create server
const server = express();

server.use(helmet());
server.use(compression()); //Compress all routes
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors())

server.get('/test',(req,res)=>{
    res.send('bawitabadebangdebangdiigydiggy')
  })

server.use('/auth',authRouter)

  // Handle errors by returning JSON
server.use((error, req, res, next) => {
    const status = error.status || 500
    res.status(status).json({
      error: { message: `Error:\n${error.message}` }
    })
  })
  
  // Start server at localhost:7000
  const port = 8085
  server.listen(port, () => {
      console.log(`Started at localhost:${port}`)
  })

  // For deploy to heroku
  // server.listen(process.env.PORT || 5000)