const express = require('express')
const route = require('./route/route');
const mongoose = require('mongoose');
const uri = "mongodb://localhost:27017/course";
const port = 8000;
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false })) // for parsing application/x-www-form-urlencoded

//app.set('view engine', 'ejs')
//app.set("views", "./views");
app.use(express.static(__dirname + '/public'));
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((db) => {
    console.log(`Connect database ${uri}`)
}).catch((err) => {
    console.log("Connect error!")
})
route(app)


app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
})