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
app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));


//cors
if (process.env.NODE_ENV === 'development') {
    app.use(cors({origin: `${process.env.CLIENT_URL}`}))
}

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
