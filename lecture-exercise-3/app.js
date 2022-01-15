import express from "express";
import fetch from "node-fetch";
import parser from "node-html-parser";

const app = express()

app.get('/', (req, res) => {
    res.type('html')
    res.sendFile("index.html", {root: './public'});
})

app.get('/index.js', (req, res) => {
    res.type('js')
    res.sendFile("index.js", {root: './public/javascripts'});
})

app.get('/style.css', (req, res) => {
    res.type('css')
    res.sendFile("style.css", {root: './public/stylesheets'});
})

app.get('/api/get_alt_tag', async (req, res) => {
    const url = req.query.url

    try {
        const response = await fetch(url);
        // .text() is an async function but parser.parse() is a sync function
        const pageContent = await response.text();
        const pageContentHTML = parser.parse(pageContent);
        const imgTags = pageContentHTML.querySelectorAll("img")

        let htmlReturn = ""

        for(let i = 0; i < imgTags.length; i++){
            let imgTag = imgTags[i];

            htmlReturn += "<h3>Image " + i + " info:</h3>"
            htmlReturn += "alt text: " + imgTag.attributes.alt + "<br>"
            htmlReturn += "img src: " + imgTag.attributes.src + "<br>"
            htmlReturn += "<img src='"+ url + imgTag.attributes.src+ "' />"
        }
        res.type("html");
        res.send(htmlReturn);
    } catch (err) {
        res.type("html");
        res.send("Failed to fetch " + url +"\n" + err);
    }
})


app.listen(3000, () => {
    console.log("Example app listening at http://localhost:3000")
});