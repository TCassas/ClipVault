import { useState } from 'react'
import NewClip from './clip/NewClip'

const Header = () => {
    const [showForm, setShowForm] = useState(false);

    const handleClick = () => {
        setShowForm(!showForm);
    }

    return (
        <div>
            <header>
                <h1>Clip<span className='vault'>Vault</span></h1>
                <div>
                    <button
                        className='navButton'
                        onClick={handleClick}
                    >Add Clip</button>
                    {/* <button className='navButton'>Log In</button> */}
                </div>
            </header>
            {showForm && <NewClip close={handleClick}/>}
        </div>
    )
}

export default Header;