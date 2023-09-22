const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();
const cors = require('cors');
const PORT = 3000;

const key = process.env.VITE_KEY;

app.use(cors({ origin: 'http://localhost:5173' }));


app.get('/api/random-word', async (req, res) => {
    try {
        const response = await axios.get('https://wordsapiv1.p.rapidapi.com/words/?random=true&lettersMax=9&hasDetails=definitions&soundsMax=9', {
            headers: {
                'X-RapidAPI-Key': key,
                'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
            },
        });
        const randomWord = response.data.word;
        res.json({ word: randomWord});
    } catch (error) {
        console.error(error);
        res.status(500).json({error : 'Failed to get word'});
    }
});

app.get('/api/hint/:word', async (req, res) => {
    const { word } = req.params;
    try {
        const response = await axios.get(`https://wordsapiv1.p.rapidapi.com/words/${word}/definitions`, {
            headers: {
                'X-RapidAPI-Key': key,
                'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
            },
        });
        const hint = response.data.definitions[0]?.definition;
        res.json({ hint });
        console.log(response.data);

    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Failed to get hint'});
    }
})

app.listen(PORT, () => {
    console.log(`Backend is running on http://localhost:${PORT}`);
    console.log(process.env.VITE_KEY);
});