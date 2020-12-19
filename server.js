const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const errorHandler = require('./middleware/error');

const connectDB = require('./config/db');

//load environment variables
dotenv.config({ path: './config/config.env' });

connectDB();

//Route files
const bootcamps = require('./routes/bootcamps');

const app = express();

//body parser
app.use(express.json());

//Dev login middleware
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//Mount routes
app.use('/api/v1/bootcamps', bootcamps);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server run in ${process.env.NODE_ENV} and listne on port ${PORT}`));

process.on('uncaughtExceptionMonitor', (err, promise) => {
    console.log(`Error: ${err.message}`);

    //close server and exit
    server.close(() => process.exit(1));
});