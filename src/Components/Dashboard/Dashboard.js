import React, { useContext } from 'react';
import './Dashboard.css';

import { AppContext } from '../../AppContext';

const Dashboard = () => {
    let { tokenData, ownerAccount } = useContext(AppContext);
    console.log(tokenData);
    return (
        <div className='dashboard'>
            <div className='dashboard__container'>
                {ownerAccount && <div className='dashboard__info'>
                    <h2>Tokens left</h2>
                    <div className='dashboard__info__inner'>
                        <p className='tokens__left'>{tokenData.yourBalance}</p>
                        <img src="./token_img.png" className='img__token' />
                    </div>
                </div>}
                <div className='dashboard__info'>
                    <h2>Your Tokens</h2>
                    <div className='dashboard__info__inner'>
                        <p className='tokens__left'>{tokenData.yourBalance}</p>
                        <img src="./token_img.png" className='img__token' />
                    </div>
                </div>
            </div>
            <div className='dashboard__container'>
                {ownerAccount && <div className='dashboard__info'>
                    <h2>Total Supply</h2>
                    <div className='dashboard__info__inner'>
                        <p className='tokens__left'>{tokenData.totalSupply}</p>
                        <img src="./token_img.png" className='img__token' />
                    </div>
                </div>}
                <div className='dashboard__info'>
                    <h2>Price</h2>
                    <div className='dashboard__info__inner'>
                        <p className='tokens__left'>${tokenData.cost}</p>
                        <img src="./token_img.png" className='img__token' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard