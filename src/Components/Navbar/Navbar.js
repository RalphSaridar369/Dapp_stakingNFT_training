import React, { useState, useEffect } from 'react';
import './Navbar.css';
import Web3 from 'web3';

const Navbar = ({ account, setOpen }) => {
  // const [icon, setIcon] = useState();
  // useEffect(() => {
  // }, [])

  return (
    <>
      <div className='navbar'>
          <div className='navbar__left'>
            <a href="/">Whitelist</a>
            <a href="/dashboard">Dashboard</a>
            <a href="/">Stake</a>
          </div>
          <a className='navbar__left__drawer__icon'
            onClick={setOpen}>
            <img src="./menu.png" style={{ width: '30px', height: '30px' }} />
          </a>
          <div className='navbar__right'>
            {account =="0x00"?
            <a className='connect__button'>Connect Wallet</a>
            :<p>{account}</p>}
          </div>
      </div>
    </>
  )
}

export default Navbar