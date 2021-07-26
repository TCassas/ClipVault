import { useState, useEffect } from 'react';
import Axios from 'axios';
import { get } from 'mongoose';

const HomeLogic = () => {
    //Random clip logic
    const [clip, setClip] = useState(null);
    const [clips, setClips] = useState([]);
    
    useEffect(async () => {
        //Todo estas volteretas las hice porque tenía errores seteando el state de clips e intentando editarlo dentro del mismo useEffect
        let response = await Axios.get('/api/clips');
        response = response.data.sort(() => Math.random() - 0.5);
        
        setClips(response);
        setClip(response[0]);
        response.shift();
        setClips(response);
    }, []);

    const getClips = async () => {
        //Todo estas volteretas las hice porque tenía errores seteando el state de clips e intentando editarlo dentro del mismo useEffect
        let response = await Axios.get('/api/clips');
        response = response.data.sort(() => Math.random() - 0.5);
        
        setClips(response);
        setClip(response[0]);
        response.shift();
        setClips(response);

        console.log(clips);
    };
    
    const nextClip = () => {
        const nextClip = clips.shift();
        if(clips.length != 0) {
            setClip(nextClip);
        }
    }

    //Retrieve data from specific clip
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

    return { clip, nextClip, getData };
}

export default HomeLogic;