import { React, useState } from 'react';
import ClipPlayer from '../../components/clip/ClipPlayer'
import HomeLogic from './HomeLogic'

const Home = () => {
    const { clip, nextClip } = HomeLogic();

    return (
        <section id='clip-main'>
            <ClipPlayer clip={clip} nextClip={nextClip}/>
        </section>
    )
}

export default Home;