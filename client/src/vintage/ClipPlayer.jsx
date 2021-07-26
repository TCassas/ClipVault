import { React, useState } from 'react';

const ClipPlayer = () => {
    const [height, setHeight] = useState(341);
    const [width, setWidth] = useState(582);
    const [resize, setResize] = useState(1);

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

    return (
        <section id='clip-main'>
            <div id='clip-player'>
                <iframe 
                    src={`https://clips.twitch.tv/embed?clip=UNDEFINED&parent=localhost&autoplay=true`}
                    frameBorder="0" 
                    allowFullScreen={true} 
                    autoPlay={true}
                    scrolling="no" 
                    height={height}
                    width={width}
                ></iframe>
            </div>
            <div id='clip-info'>
                <h1>xQc gets jebaited</h1>
                <b>Channel: <a href='#'>xQcOW</a></b>
                <p>Clipped by: <a href='#'>idionisio</a> - 6/6/2021</p>
                <a href='#'>Continue watching</a>
                <p>Lenguage: en</p>
                <p>Slug: slug</p>
            </div>
            <div className='clip-size-buttons'>
                <button onClick={decreaseSize}><span class="material-icons"> remove </span></button>
                <button onClick={increaseSize}><span class="material-icons"> add </span></button>
                <span> x{resize}</span>
            </div>
            <div className='clip-remote'>
                <button><span class="material-icons"> feedback </span></button>
                <button><span class="material-icons"> skip_next </span></button>
            </div>
        </section>
    )
}

export default ClipPlayer;