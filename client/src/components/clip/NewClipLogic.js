import { useState } from 'react'
import Axios from 'axios'
import HomeLogic from '../../Routes/Home/HomeLogic';

const NewClipLogic = () => {
    const [link, setLink] = useState('');
    const [notification, setNotification] = useState(null);
    const [error, setError] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const { getData } = HomeLogic();
    
    //Reformat link
    const reformat = (link) => {
        const slog = link.indexOf('clips.twitch.tv') > 0 ? 
            link.slice(link.indexOf('clips.twitch.tv/') + 16)
        :
            link.indexOf('?filter') > 0 ?
                link.slice(link.indexOf('/clip/') + 6, link.indexOf('?'))
            :
                link.slice(link.indexOf('/clip/') + 6)
        ;

        return slog;
    }

    //Post request to add clip to the database
    const handleSubmit = async (e) => {
        e.preventDefault();
        const slog = await reformat(link);

        const data = await getData(slog);

        try {
            const response = await Axios.post('/api/clips', { data });

            setNotification(response.data.message);
            setShowNotification(!showNotification);
        } catch(err) {
            setError(err.response.data.message);
            setShowNotification(!showNotification);
        }
    }

    //Handle Link input change
    const handleChange = (e) => {
        setLink(e.target.value);
    }

    //Handle close notification button
    const handleNotification = () => {
        setShowNotification(!showNotification);
    }

    return { link, setLink, handleSubmit, handleChange, reformat, error, notification, showNotification, handleNotification };
}

export default NewClipLogic;