import { React, useState } from 'react';
import clipPlayerLogic from './clipPlayerLogic';

const ClipPlayer = (props) => {
    const { increaseSize, decreaseSize, height, width, resize } = clipPlayerLogic();
    const { clip, nextClip } = props;

    //IMPORTANTE CHECKEAR QUE LOS CLIPS TENGAN TODOS LOS CAMPOS COMPLETOS
    //CHECKEAR QUE LOS CLIPS NO SE REPITAN EN LA BASE ANTES DE GUARDAR - POR ESO A VECES NO FUNCIONA EL BOTON DE NEXT CLIP

    return (
        <div>
            {clip != null &&
            <div>
                <div id='clip-player'>
                    <iframe 
                        src={`https://clips.twitch.tv/embed?clip=${clip.twitchData.slug}&parent=localhost&autoplay=true`}
                        frameBorder="0" 
                        allowFullScreen={true} 
                        autoPlay={true}
                        scrolling="no" 
                        height={height}
                        width={width}
                    ></iframe>
                </div>

                <div id='clip-info'>
                    <h1> {clip.twitchData.title} </h1>
                    <b>Channel: 
                        <a href={clip.twitchData.broadcaster.channel_url}>{clip.twitchData.broadcaster.name}</a>
                        <img src={clip.twitchData.broadcaster.logo}></img>
                    </b>
                    <p>Clipped by: <a href={clip.twitchData.curator.channe_url}>{clip.twitchData.curator.name}</a> - {clip.twitchData.created_at}</p>
                    <p><a href={clip.twitchData.vod.url}>Continue watching</a></p> 
                    <p>Lenguage: {clip.twitchData.language}</p>
                    <p className='slug'>Slug: {clip.twitchData.slug}</p>
                </div>

                <div className='clip-size-buttons'>
                    <button onClick={decreaseSize}>
                        <span class="material-icons"> remove </span>
                    </button>
                    <button onClick={increaseSize}>
                        <span class="material-icons"> add </span>
                    </button>
                    <span> x{resize}</span>
                </div>

                <div className='clip-remote'>
                    {/* <button>
                        <span class="material-icons"> feedback </span>
                    </button> */}

                    <button onClick={nextClip}>
                        <span class="material-icons"> skip_next </span>
                    </button>
                </div>
            </div>
            }
        </div>
    )
}

export default ClipPlayer;