const express = require('express');
const cors = require('cors');
const path = require('path');
const productRouter = require('./routes/productRouter');

const app = express();
// Enable CORS for all origins
app.use(cors({ origin: 'http://127.0.0.1:3000' }));
  
app.use(express.json()); //req.body = {...}

app.use('/products', productRouter);


app.listen(3001, ()=>console.log('listen on 3001'));