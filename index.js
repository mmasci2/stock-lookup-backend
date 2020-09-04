const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// set up express

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is listening on port ${port}`));

// set up mongoose

mongoose.connect(process.env.MONGODB_CONNECTION_STR, {
    useFindAndModify: false, 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
}, (e) => {
    if(e) throw e;
    console.log('Mongodb connection established');
});

// set up routes

app.use('/users', require('./routes/userRouter'));
app.use('/quote', require('./routes/quoteRouter'));
app.use('/watchlist', require('./routes/watchlistRouter'));