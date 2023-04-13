const express = require('express');
const router = require('./router');

const app = express();
app.get('/', express.static('./client-side'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(router);

app.listen(3000, () => console.log('http://localhost:3000'));