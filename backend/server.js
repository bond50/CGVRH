'use strict';

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const blogRoutes = require('./routes/blog')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const tagRoutes = require('./routes/tag')
const formRoutes = require('./routes/form')
const uploadRoute = require('./routes/fileUpload')
const serviceRoutes = require('./routes/services')


const app = express()

//db
mongoose
    .connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,

    })
    .then(() => {
        console.log('database connection established')
    })

//middleware
app.use(morgan('tiny'))
app.use(cookieParser())


app.use(express.json({limit: '200mb'}));
app.use(bodyParser.urlencoded({limit: "200mb", extended: true}));


//cors

app.use((req, res,next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin,X-Requested-With,Content-Type,Accept,Authorization')

    if (req.method==='OPTIONS'){
         res.header('Access-Control-Allow-Methods', 'PUT,PATCH,POST,DELETE,GET')
        return res.status(200).json({})
    }
    next()
})

// port
const port = process.env.PORT || 8000

// route middleware
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', blogRoutes);
app.use('/api', authRoutes);
app.use('/api', tagRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', formRoutes);
app.use('/api', uploadRoute);
app.use('/api', serviceRoutes);


app.listen(port, () => {
    console.log(`Server listening at http://0.0.0.0:${port}`)
})
