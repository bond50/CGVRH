'use strict';
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');
dotenv.config();



const ip = require("ip");
const {readdirSync} = require("fs");
const app = express()


//db

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,

}
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log('database connection established')
    })
    .catch((error) => console.log(error))


//middleware
app.use(morgan('tiny'))
app.use(cookieParser())


app.use(express.json({limit: '200mb'}));
app.use(bodyParser.urlencoded({limit: "200mb", extended: true}));


//cors
// const corsOptions = {
//     origin: process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL : '*',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
//     credentials: true, // set to true if you need cookies to be sent across domains
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
//
//
// app.use(cors(corsOptions));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin,X-Requested-With,Content-Type,Accept,Authorization')

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,PATCH,POST,DELETE,GET')
        return res.status(200).json({})
    }
    next()
})


// port
const port = process.env.PORT || 8000

// route middleware
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
readdirSync('./routes/').map(r => app.use('/api', require(`./routes/${r}`)))

process.on('uncaughtException', function (exception) {
    console.log(exception); // to see your exception details in the console
    // if you are on production, maybe you can send the exception details to your
    // email as well ?
});

app.listen(port, `0.0.0.0`, () => {

    setTimeout(() => {
        console.log(`Your backend REST api endpoint is at
           Local:            http://localhost:${port}/api
           On Your Network:  http://${ip.address()}:${port}/api
        `
        )
    }, 1000);


});