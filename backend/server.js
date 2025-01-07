'use strict';
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

const ip = require('ip');
const { readdirSync } = require('fs');
const app = express();

// Database connection
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
};

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('Database connection established'))
    .catch((error) => console.log('Database connection error:', error));

// Middleware setup
app.use(morgan('tiny'));
app.use(cookieParser());
app.use(express.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));

// CORS setup
const isDevelopment = process.env.NODE_ENV === 'development';

const whitelist = [
    `https://${process.env.SERVER_IP}:${process.env.CLIENT_PORT}`,
    'https://galavuwal.com',
    process.env.CLIENT_URL,
    process.env.CLIENT_URL_DEV,

];

const corsOptions = {
    origin: isDevelopment
        ? '*'
        : function (origin, callback) {
            if (whitelist.includes(origin) || !origin) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
    credentials: true
};

app.use(cors(corsOptions));

// Static file serving
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to Vihiga Teaching and Referral Hospital');
});

// Dynamic route loading
readdirSync('./routes/').map((r) => app.use('/v1', require(`./routes/${r}`)));

// Error handling for uncaught exceptions
process.on('uncaughtException', (exception) => {
    console.error('Uncaught Exception:', exception);
});

// Server setup
const port = process.env.PORT || 8000;
app.listen(port, '0.0.0.0', () => {
    setTimeout(() => {
        console.log(`Your backend REST API endpoint is available at:
           Local:            http://localhost:${port}/api
           On Your Network:  http://${ip.address()}:${port}/api
        `);
    }, 1000);
});
