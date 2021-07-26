import React from 'react';
import NewClipLogic from './NewClipLogic';

const NewClip = (props) => {
    const { link, handleChange, handleSubmit, notification, error, showNotification, handleNotification } = NewClipLogic();

    return (
        <section id='addClip-container'>
            <div id='addClip'>
                
                <button className='closeForm' onClick={props.close}>
                    <span class="material-icons">close</span>
                </button>
                <strong>Add new Clip</strong>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label id='link'>Link </label>
                        <input type='text' htmlFor='link' name='link' value={link} onChange={handleChange} />
                    </div>
                    <button type='submit'>Send</button>
                </form>

                <div>
                    <b className='slug left'>Your link may look like the following: </b>
                    <p className='slug left'>{`https://www.twitch.tv/xqcow/clip/SmoothProtectiveHorseStinkyCheese?filter=<something>`}</p>
                    <p className='slug left'>https://www.twitch.tv/coscu/clip/BrightBoredWhaleWOOP</p>
                    <p className='slug left'>https://clips.twitch.tv/SmokyCrypticConsoleSquadGoals-jOBwk6OzK4JQ-Q_D</p>
                    <b className='slug left'>Or just the rainbow part: </b>
                    <p className='slug left'>https://clips.twitch.tv/<span className='vault'>SmokyCrypticConsoleSquadGoals-jOBwk6OzK4JQ-Q_D</span></p>
                </div>
            </div>

            {notification != null && showNotification ?
                <div id='notification' className='success'>
                    {notification}
                    <button onClick={handleNotification}> 
                        <span class="material-icons"> close </span> 
                    </button>
                </div>
            : null}

            {error != null && showNotification ?
                <div id='notification' className='error'>
                    {error}
                    <button onClick={handleNotification}> 
                        <span class="material-icons"> close </span> 
                    </button>
                </div>
            : null}
        </section>
    )
}

export default NewClip;