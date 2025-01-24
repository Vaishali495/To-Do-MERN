const express = require("express");
const cors = require("cors");
const app = express();      //instance of express
const PORT = 4000;

//middlewares
app.use(cors());
app.use(express.json());            //convert JSON response to JSON object
app.use(express.urlencoded({ extended: true }));    //convert HTML form data to JS object and true means handle nested object

//for mongoDb connection
const {connectMongoDb} = require('./models/connection.js');
connectMongoDb("mongodb://localhost:27017/TodoDashboard");

// Routes definition
const indexRoutes = require('./routes/indexRoutes.js');
app.use('/',indexRoutes);

app.listen(PORT, () => {
    console.log("Server is running on", PORT); 
});