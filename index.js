const express = require('express')

//Requqire model
const Clip = require('./models/clip');

//Express configuration
const app = express();
const PORT = 5000;
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Database connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/clipsProject', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Database connected')
    })
    .catch(() => {
        console.log('Error connecting to database');
    })

//Routes
app.get('/api/clips', async (req, res) => {
    const clips = await Clip.find();
    res.json(clips);
});

app.post('/api/clips', async (req, res) => {
    const { data } = await req.body;

    //Before saving the clip in the database, search if it is already in it.
    //I use Clip.find instead of Clip.findOne because it is supposed that there are not duplicated clips
    const existentClip = await Clip.find({"twitchData.tracking_id": `${data.tracking_id}`});
    
    if(existentClip[0]) {
        res.status(500).send({message: 'That clip has already been added before'});
    } else {
        const newClip = new Clip({twitchData: data});
        const response = await newClip.save();

        //If twitch api did found the clip...
        if(response.twitchData) {
            res.status(201).json({
                message: 'New clip has been added to the database!'
            })
        }
    }
})

//Express port setup
app.listen(PORT || env.PORT, (req, res) => {
    console.log("Server started")
});