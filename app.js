const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(8000, err => {
    if(err) console.log(err);

    console.log('App is running on port 8000...');
});