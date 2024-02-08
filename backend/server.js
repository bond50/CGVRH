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
const blogRoutes = require('./routes/blog')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const tagRoutes = require('./routes/tag')
const formRoutes = require('./routes/form')
const uploadRoute = require('./routes/fileUpload')
const serviceRoutes = require('./routes/pages')
const pageCategoryRoutes = require('./routes/page-category')
const serviceTagRoutes = require('./routes/service-tag')
const searchRoutes = require('./routes/search')
const galleryTagRoutes = require('./routes/gallery-tag')
const documentTagRoutes = require('./routes/document-tag')
const staffRoutes = require('./routes/sheets')
const tenderRoutes = require('./routes/tender')
const cloudinaryRoutes = require('./routes/cloudinary')
const projectRoutes = require('./routes/project')



const ip = require("ip");
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
app.use('/api', blogRoutes);
app.use('/api', authRoutes);
app.use('/api', tagRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', formRoutes);
app.use('/api', uploadRoute,);
app.use('/api', serviceRoutes);
app.use('/api', serviceTagRoutes);
app.use('/api', pageCategoryRoutes);
app.use('/api', searchRoutes);
app.use('/api', galleryTagRoutes);
app.use('/api', documentTagRoutes);
app.use('/api', staffRoutes);
app.use('/api', cloudinaryRoutes);
app.use('/api', tenderRoutes);
app.use('/api', projectRoutes);


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