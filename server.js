//import express.js
const express = require('express');
const app = express();

//import models
const Item = require('./models/menuitemModel')
const Order = require('./models/orderModel')
const User = require('./models/userModel')


//import mongoose and ramenking database
const db = require('./db.js')
app.use(express.json());
const path = require('path')

//import routes from menuitemsRoute, userRoute, placeorderRoute
const itemRoute = require('./routes/menuitemsRoute')
const userRoute = require("./routes/userRoute")
const placeorderRoute = require("./routes/placeorderRoute")

//set endpoints that send requested data from URL to itemRoute, userRoute, placeorderRoute
app.use('/api/items/', itemRoute)
app.use('/api/users/', userRoute)
app.use('/api/orders/', placeorderRoute)


//Deployment code to heroku server
if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static('client/build'))

    app.get('*', (req, res)=> {
        res.sendFile(path.resolve(__dirname , 'client/build/index.html'))
    })
}

//Implement JSON formats
//get all menu items from mongodb items collection in JSON Format
app.get("/getitems", (req, res) => {
    Item.find({} , (err, docs) => {
        if(err){
            console.log(err);
        } else {
            res.send(docs)
        }
    })
});

//get all paid orders from mongo db orders collection in JSON Format
app.get("/getorders", (req, res) => {
    Order.find({} , (err, docs) => {
        if(err){
            console.log(err);
        } else {
            res.send(docs)
        }
    })
});

//get all users objects from mongodb users collection in JSON Format
app.get("/getusers", (req, res) => {
    User.find({} , (err, docs) => {
        if(err){
            console.log(err);
        } else {
            res.send(docs)
        }
    })
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server running on port");
    "Server Running on Port";
});

