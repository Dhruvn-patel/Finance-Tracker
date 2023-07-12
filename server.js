const express = require('express');
const app = express();
const cors = require("cors");
const morgan = require("morgan")
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv').config();
const routes = require('./routes/transactionroute');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({ limit: 1024 * 1024 * 10, type: 'application/json' });
const PORT = process.env.PORT

app.use(cors({ credentials: true, origin: 'http://localhost:8080' }))
app.use(bodyParser.text({ limit: '200mb' }))
//middleware
app.use(jsonParser);
app.use(express.json())
app.use(express.static("public"))
app.use(cookieParser());
//routes
app.use('/api/', routes)
app.listen(PORT, () => {
    console.log(`listening port ${PORT}`);
})