const express = require('express');

const app = express();
const port = 3001;

app.set('views', './assets/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('page/home'); 
});

app.listen(port, () => {
    console.log(` Application lancée  : http://localhost:${port}`);
})