import React, {useContext} from 'react';
import './Dashboard.css';

import { AppContext } from '../../AppContext';

const Dashboard = () =>{
    let {tokenData, ownerAccount} = useContext(AppContext);
    console.log(tokenData);
    return(
        <div className='dashboard'>
            <div className='tokens__container'>
                {ownerAccount && <div className='tokens'>
                <h2>Tokens left</h2>
                    <p className='tokens_left'>{tokenData.basicTokenBalance}</p>
                    <img src="./token_img.png" className='img_token'/>
                </div>}
                <div className='tokens'>
                <div>
                    <h2>Your tokens</h2>
                        <p className='tokens_left'>{tokenData.yourBalance}</p>
                        <img src="./token_img.png" className='img_token'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard