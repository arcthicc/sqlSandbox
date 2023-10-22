const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080; // Change this to your desired port

const { getAllData, getSpecificData, createData } = require('./database');

app.get('/', (req, res) => {
    res.render("index.ejs")
})
app.use(express.static("public"))

app.use(express.json());
app.use(bodyParser.json());       // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// Route to get all data
app.get('/data/getalldata', (req, res) => {
    const allData = getAllData();
    res.json(allData);
});

// Route to get specific data by ID
app.get('/data/getspecificdata/:id', async (req, res) => {
    const id = req.params.id;
    const specificData = await getSpecificData(id);
    if (specificData) {
        res.json(specificData);
    } else {
        res.status(404).json({ error: 'Data not found' });
    }
});

// Route to create new data
app.post('/data/createdata', (req, res) => {
    try {
        const item = req.body.input; // Data to create
        console.log(item);
        // Process and save the data using the createData function or your logic
        const newItem = createData(item);
        // Send a success response
        res.status(200).json(newItem);
    } catch (error) {
        // Handle any errors that occur during data creation
        res.status(500).json({ error: 'Data creation failed' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});