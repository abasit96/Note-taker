const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./db/db.json"))
})

app.post("/api/notes", (req, res) => {
    console.log(req.body)

    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        const parsedData = JSON.parse(data);

        parsedData.push(req.body);

        fs.writeFile("./db/db.json", JSON.stringify(parsedData), () => {
            console.log("Note added!")
            res.json(parsedData)
        })
    })

})

app.listen(3001, () => {
    console.log("Server is running!")
})
