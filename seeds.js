const Axios = require('axios');

const mongoose = require('mongoose');
const Clip = require('./models/clip');

//Connecting to database
mongoose.connect('mongodb://localhost:27017/clipsProject', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Database connected')
    })
    .catch(() => {
        console.log('Error connecting to database');
    })

const clipSeeds = [
    {
        link: "AdventurousOddHummingbirdBCouch-26XOEhaFvKwqhNZw"
    },
    {
        link: "BitterReliableCarabeefGOWSkull-CUn7wm4-__nD7TWD"
    },
    {
        link: "GiantBrightGuanacoCoolCat-JXCbq3uaWj1cDC7e"
    },
    {
        link: "GoodFaithfulClipzBrainSlug-KMgdrTK4vWnEv3Rb"
    },
    {
        link: "UgliestTransparentAlligatorMVGame-uRDmri3uYK-EcIAr"
    },
    {
        link: "AdventurousOddHummingbirdBCouch-26XOEhaFvKwqhNZw"
    }
]

/**
 * https://www.twitch.tv/rodsquare/clip/PlacidObliviousWolverinePraiseIt-jnQAX1ByqTjp4IN3?filter=clips&range=7d&sort=time
 * https://www.twitch.tv/illojuan/clip/BlightedInexpensiveRuffSeemsGood-W8gznNOYyAuz4a7I?filter=clips&range=7d&sort=time
 * https://clips.twitch.tv/StrongSpunkyOtterPipeHype-3tTbpbKoE263P8kJ?tt_medium=clips&tt_content=recommendation
 * https://www.twitch.tv/rodsquare/clip/SassyWittyWormHotPokket-mDb2gZSyNoYWFIVR
**/
const getData = async (slog) => {
    const response = await Axios.get(
        `https://api.twitch.tv/kraken/clips/${slog}`, 
        {headers: {
            'client-id': 'pqj580bxcchu3f55a9wqe5qokxpqwj',
            'Accept': 'application/vnd.twitchtv.v5+json'
        }
    })

    return response.data;
}

const seedDB = async () => {
    for(seed of clipSeeds) {
        const clip = await getData(seed.link);
        const newClip = new Clip({twitchData: clip});

        const response = await newClip.save();
        console.log(response);
    }
}

seedDB();