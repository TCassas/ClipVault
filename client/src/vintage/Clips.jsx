import { React, useState, useEffect } from 'react'
import Axios from 'axios'

const Clips = () => {
    const [clip, setClip] = useState(null);
    const [clips, setClips] = useState([]);
    const [clipLink, setClipLink] = useState('');

    //
    const [search, setSearch] = useState('');
    
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
        setClip(nextClip);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await getData();

        const response = await Axios.post('/api/clips', { data });
    }

    const handleSubmitSearch = async (e) => {
        e.preventDefault();

        const response = await Axios.get(
            `https://api.twitch.tv/kraken/search/channels?query=${search}`, 
            {headers: {
                'client-id': 'pqj580bxcchu3f55a9wqe5qokxpqwj',
                'Accept': 'application/vnd.twitchtv.v5+json'
            }
        })

        console.log(response.data.channels.sort((a, b) => -a.followers + b.followers));
    }

    const getData = async () => {
        const slog = clipLink.indexOf('clips.twitch.tv') > 0 ? 
            clipLink.slice(clipLink.indexOf('clips.twitch.tv/') + 16)
        :
            clipLink.indexOf('?filter') > 0 ?
                clipLink.slice(clipLink.indexOf('/clip/') + 6, clipLink.indexOf('?filter'))
            :
                clipLink.slice(clipLink.indexOf('/clip/') + 6)
        ;

        const response = await Axios.get(
            `https://api.twitch.tv/kraken/clips/${slog}`, 
            {headers: {
                'client-id': 'pqj580bxcchu3f55a9wqe5qokxpqwj',
                'Accept': 'application/vnd.twitchtv.v5+json'
            }
        })

        return response.data;
    }
    
    return (
        <div>
            <div>
                <h1>Submit clip</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Link</label>
                        <input
                            type='text'
                            onChange={handleChange}
                            value={clipLink}
                        />
                        <button>Send</button>
                    </div>
                </form>
            </div>
            <div>
                <h1>Search</h1>
                <form onSubmit={handleSubmitSearch}>
                    <div>
                        <label>Link</label>
                        <input
                            type='text'
                            onChange={handleChangeSearch}
                            value={search}
                        />
                        <button>Send</button>
                    </div>
                </form>
            </div>
        {clip != null &&
            <div>
                <section id='clip-main'>
                    <div>
                        <iframe 
                            src={`https://clips.twitch.tv/embed?clip=${clip.twitchData.slug}&parent=localhost&autoplay=true`}
                            frameBorder="0" 
                            allowFullScreen={true} 
                            autoPlay={true}
                            scrolling="no" 
                            height="378" 
                            width="620"
                        ></iframe>
                    </div>
                    <div>
                        <h1>{clip.twitchData.title}</h1>
                        <b>Channel: <a href={clip.twitchData.broadcaster.channel_url}>{clip.twitchData.broadcaster.name}</a></b>
                        <p>Clipped by: <a href={clip.twitchData.curator.channel_url}>{clip.twitchData.curator.name}</a> - {clip.twitchData.created_at}</p>
                        <a href={clip.twitchData.vod.url}>Continue watching</a>
                        <p>Lenguage: {clip.twitchData.language}</p>
                        <p>Slug: {clip.twitchData.slug}</p>
                    </div>
                </section>
                <br/><button onClick={nextClip}>Next</button>
            </div>
        }
        </div>
        )
    }
    
    export default Clips;