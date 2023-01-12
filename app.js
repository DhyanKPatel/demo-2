const express = require('express');
const bodyParser = require('body-parser');
const cookie = require('cookie-parser'); 
require('./model/db');

const app = express()
app.use(cookie());

app.use(bodyParser.urlencoded({ extended: false, parameterLimit:100000,limit:'1000mb' }));
app.use(bodyParser.json());


app.use(express.static('public/uploads'));
// app.use(db);
app.use('/', require('./routes/auth'));
app.use('/', require('./routes/category'));
app.use('/', require('./routes/contact'));
app.use('/', require('./routes/Testimonial'));
app.use('/', require('./routes/portfolio'));

const port = process.env.PORT || 5000;


app.listen(port, () => console.log(`Listening on port ${port}`))