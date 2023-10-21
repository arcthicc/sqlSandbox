const express = require('express');
const app = express();

const { getAllData, getSpecificData, createData } = require('./database.js');


app.get('/', (req, res) => {
    res.render("index.ejs")
})



app.get("/data/getalldata", async (req, res) => {
    const allData = getAllData();
    res.json(allData);
})

app.get("/data/getspecificdata", async (req, res) => {
    const SQLSandboxSpecificData = await getSpecificData(3);
    console.log(SQLSandboxSpecificData);
})

app.get("/data/createdata", async (req, res) => {
    const result = await createData('Second piece of Data');
    console.log(result);
})

app.use(express.static("public"))

app.use((err, req, res, next) => {
    s
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(8080, () => {
    console.log("Server is running on port 8080");
})