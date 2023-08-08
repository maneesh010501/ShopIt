const express = require('express')
const mongoose = require('mongoose')
const { getproducts, postproduct, deleteproduct } = require('./controllers/productController')
const {getusers,postuser, updateuser,loginUser} = require('./controllers/userController')
const fs = require('fs');
const morgan = require('morgan');
const multer  = require('multer');
const path = require('path');
const {getOrders, postOrder,updateOrder } = require('./controllers/orderController');
//const product = require('./models/productModel')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const helmet = require('helmet')


require('dotenv').config()

const port = process.env.PORT
const mongo_uri = process.env.DATABASE
const app = express()
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


//security middleware
app.use(helmet())


//middleware to allow requests from a domain(CORS)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

//connecting to DB and Starting server
mongoose.connect("mongodb+srv://nachiketa:VWuIjQyTfLPFKQsx@shopitdatabase.rrn4lrx.mongodb.net/test")
.then(()=>{
    app.listen(9999,()=>{
        console.log(`Server connected to DB and Running on port 9999`)
    })
})
.catch((err)=>{
    console.log(err)
})

// Creating a write stream for the log file
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

//Morgan middleware to log HTTP requests to a file
app.use(morgan('short', { stream: accessLogStream, skip: (req, res) => req.path.startsWith('/static') }));

//Multer
const upload = path.join(__dirname, '..', '..', 'fsd_project', 'frontend', 'public', 'images');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log('i am here')
      cb(null, upload)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname)
    }
})

const imageupload = multer({ storage: storage })


//APIs for Products
app.get('/products',getproducts)

app.post('/products', imageupload.single('image') , postproduct)

app.delete('/products/:id',deleteproduct)

//APIs for Users
app.get('/users',getusers)

app.post('/users',postuser)

app.put('/users/:id',updateuser)

app.post('/login', loginUser)

//APIs for Orders
app.get('/orders',getOrders)

app.post('/orders',postOrder)

app.put('/orders/:id',updateOrder)

module.exports = app;

//app.get('/api/config/paypal',(req,res)=>res.send("AcKF2CoFobzqd2inM-KXiS3wSrFTURuZxAoD_QP6OPMKgPfsNL0V93CQ4bJakWedCENUQT5Xp7ZyFZAc"))



