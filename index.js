const express = require('express');
const router = require('./router');
require('dotenv').config();

const app = express();
app.get('/', express.static('./client-side'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));