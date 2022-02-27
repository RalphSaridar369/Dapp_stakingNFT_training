import React from 'react';
import './Stake.css';

const Stake = (props) =>{
    return(
        <div className='stake'>
            <div className='stake__container' >
                <div className='stake__container__left'>
                    <div className="stake__header__container">
                        <h2 className='stake__header__text'>Unstaked</h2>
                            <button className='stake__header__button'>Stake</button>
                            <button className='stake__header__button'>Stake All</button>
                    </div>
                    <div className='stake__container__nft'>
                        <img src="./nft.jpg" className='stake__nft' />
                        <img src="./nft.jpg" className='stake__nft' />
                        <img src="./nft.jpg" className='stake__nft' />
                        <img src="./nft.jpg" className='stake__nft' />
                    </div>
                </div>
                <div class="stake__container__right">
                    <div className="stake__header__container">
                        <h2 className='stake__header__text'>Staked</h2>
                        <button className='stake__header__button'>Unstake</button>
                        <button className='stake__header__button'>Unstake All</button>
                    </div>
                    <div className='stake__container__nft'>
                        <img src="./nft.jpg" className='stake__nft' />
                        <img src="./nft.jpg" className='stake__nft' />
                        <img src="./nft.jpg" className='stake__nft' />
                        <img src="./nft.jpg" className='stake__nft' />
                        <img src="./nft.jpg" className='stake__nft' />
                        <img src="./nft.jpg" className='stake__nft' />
                        <img src="./nft.jpg" className='stake__nft' />
                        <img src="./nft.jpg" className='stake__nft' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stake