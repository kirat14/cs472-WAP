const express = require('express');
const productRouter = require('./routes/productRouter');

const app = express();
// Enable CORS for all origins
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
  
app.use(express.json()); //req.body = {...}

app.use('/products', productRouter);


app.listen(3000, ()=>console.log('listen on 3000'));