const db = require("./models");
const express = require('express');
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Add Routes
app.use(express.static(__dirname + '/public'));
app.use('/', require('./controllers/burgerController'));

// Set up handlebars view engine
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");


// Connect to the database and start express server
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`);
    });
});
