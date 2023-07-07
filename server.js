const express = require('express');
const app = express();
const cors = require("cors");
const dotenv = require('dotenv').config();
const routes = require('./routes/transactionroute');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({ limit: 1024 * 1024 * 10, type: 'application/json' });
app.use(jsonParser);
app.use(bodyParser.text({ limit: '200mb' }))
//middleware
app.use(express.json())
app.use(cors())
//routes
app.use('/api/', routes)
app.use(express.static("public"))
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`listening port ${PORT}`);
})