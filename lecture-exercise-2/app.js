import express from 'express'
import dateFormat from 'dateformat'
import fs from 'fs'
import pluralize from 'pluralize'

const app = express();

app.get('/', (req, res) => {
    res.type('html');
    res.send(fs.readFileSync("index.html"));
});

app.get('/index.js', (req, res) => {
    res.type('js');
    res.send(fs.readFileSync("index.js"));
});

app.get('/api/gettime', (req, res) => {
    let day = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
    res.type("txt")
    res.send(day)
});

app.get('/api/pluralize', (req, res) => {
    const pluralizedWord = pluralize(req.query.word);
    res.type("txt")
    res.send(pluralizedWord)
})

app.listen(3000, () => {
    console.log('Example app listening at http://localhost:3000')
})
