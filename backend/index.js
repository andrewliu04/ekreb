const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;
app.use(cors());

let score = 0;


app.get('/hello', (req, res) => {
    res.send('hello world');
});

app.get('/score', (req, res) => {
    res.send(`${score}`)
});

app.patch('/score', (req, res) => {
    score += parseInt(req.query.val);
    res.status(500).res.send(`${score}`);
});

app.listen(PORT, () => {
    console.log(`Backend is running on http://localhost:${PORT}`);
});