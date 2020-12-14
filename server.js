const express = require('express');
const dotenv =require('dotenv');

//Route files
const bootcamps = require('./routes/bootcamps');

//load environment variables
dotenv.config({ path: './config/config.env' });

const app = express();

//Mount routes
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server run in ${process.env.NODE_ENV} and listne on port ${PORT}`));