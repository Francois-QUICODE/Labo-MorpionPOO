const express = require('express');

const app = express();
const port = 3001;

app.set('views', './assets/views');
app.set('view engine', 'ejs');

app.use(express.static('assets'));
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', (req, res) => {
    res.render('pages/home', {
        styles: [
            {
                path: 'css/style.css'
            }

        ]
    });
});

app.get('/tictactoe', (req, res) => {
    res.render('pages/tictactoe', {
        size: req.query.size,
        goal: req.query.goal,
        scripts: [
            {
                path: 'scripts/main.js',
                type: 'module'
            }
        ],
        styles: [
            {
                path: 'css/style.css'
            }

        ]
    })
})

app.listen(port, () => {
    console.log(` Application lancée  : http://localhost:${port}`);
})