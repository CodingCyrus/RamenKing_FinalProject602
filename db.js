const mongoose = require("mongoose");

//mongoDB documentation set up to connect to Database
var dbUrl = 'mongodb+srv://CodingCyrusBU:DataFun123$@codingcyruscluster0.bdicg.mongodb.net/RamenKingData_CS602?retryWrites=true&w=majority'
mongoose.connect(dbUrl , {useUnifiedTopology: true, useNewUrlParser:true})

var db = mongoose.connection

db.on('connected' , () => {
    console.log('MongoDB Connect SUCCESS')
})

db.on('error', () => {
    console.log('MongoDB Connection FAILED')
    
})

module.exports = mongoose