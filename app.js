const express = require('express');
const ejs = require('ejs');


const app = express();
const port = 3001;

app.get('/', (req, res) => {
    res.send('Ca Marche !!!'); 
});

app.listen(port, () => {
    console.log(` Application lancée sur le port ${port}`);
})