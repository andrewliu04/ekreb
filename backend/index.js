const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();
const PORT = 3000;

const key = process.env.VITE_KEY;

app.use(express.json());

app.get('/api/random-word', async (req, res) => {
    try {
        const response = await axios.get('https://wordsapiv1.p.rapidapi.com/words/?random=true', {
            headers: {
                'X-RapidAPI-Key': key,
                'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
            },
        });
        const randomWord = response.data.word;
        res.json({ word: randomWord});
        console.log(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({error : 'Failed to get word'});
    }
});

app.get('/api/hint/:word', async (req, res) => {
    const { word } = req.params;
    try {
        const response = await axios.get('https://wordsapiv1.p.rapidapi.com/words/${word}/definitions', {
            headers: {
                'X-RapidAPI-Key': process.env.VITE_WORDS_API_KEY,
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