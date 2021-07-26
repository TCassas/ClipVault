import { useState, useEffect } from 'react';
import Axios from 'axios';

const clipPlayerLogic = () => {
    //Clip player size state
    const [height, setHeight] = useState(341);
    const [width, setWidth] = useState(582);
    const [resize, setResize] = useState(1);
    //Random clip logic
    const [clip, setClip] = useState(null);
    const [clips, setClips] = useState([]);
    const [clipLink, setClipLink] = useState('');
    
    useEffect(async () => {
        //Todo estas volteretas las hice porque tenía errores seteando el state de clips e intentando editarlo dentro del mismo useEffect
        let response = await Axios.get('/api/clips');
        response = response.data.sort(() => Math.random() - 0.5);
        
        setClips(response);
        setClip(response[0]);
        response.shift();
        setClips(response);
    }, []);
    
    const handleChange = (e) => {
        setClipLink(e.target.value);
    }

    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
    }
    
    const nextClip = () => {
        const nextClip = clips.shift();
        if(clips.length != 0) {
            setClip(nextClip);
        }
    }

    //Change the size of the clip player (2 functs)
    const increaseSize = () => {
        if(height <= 341 && width <= 582) {
            changeSize(20);
        }
    }

    const decreaseSize = () => {
        if(height >= 301 && width >= 504) {
            changeSize(-20)
        }
    }

    //Resize just shows on screen the amount of zoom applied to the clip player
    const changeSize = (size) => {
        setHeight(height + size);
        setWidth(width + size);
        if(resize == 1 && size < 0) {
            setResize(resize - 2);
        } else if (resize == -1 && size > 0) {
            setResize(resize + 2);
        } else {
            setResize(size > 0 ? resize + 1: resize - 1);
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

    //Reformat link
    const reformat = (link) => {
        const slog = link.indexOf('clips.twitch.tv') > 0 ? 
            link.slice(link.indexOf('clips.twitch.tv/') + 16)
        :
            link.indexOf('?filter') > 0 ?
                link.slice(link.indexOf('/clip/') + 6, link.indexOf('?filter'))
            :
                link.slice(link.indexOf('/clip/') + 6)
        ;

        return slog;
    }

    return { height, width, increaseSize, decreaseSize, resize, clip, nextClip, getData };
}

export default clipPlayerLogic;