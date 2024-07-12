const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors');



connectToMongo();

const app = express()
const port = 5000


const corsOptions = {
  origin: 'https://locations-tracker.netlify.app', 
  // origin:"http://localhost:3000",
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow credentials (cookies, etc.) if needed
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));


app.use(express.json())


app.use('/api',require('./route/allroute'))

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening on port ${port}`);
})
