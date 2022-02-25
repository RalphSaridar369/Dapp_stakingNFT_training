import React from 'react';
import './Drawer.css';

const Drawer = ({ open }) =>{
    return(
        <div className='navbar__left__drawer__container'
        style={{ width: open ? '200px' : "0px" }}>
        <div className='navbar__left__links__container'
          style={{ marginLeft: open ? "10px" : "-200px" }}>
          <a href="/" style={{ color: 'white' }}>Whitelist</a>
          <a href="/dashboard" style={{ color: 'white' }}>Dashboard</a>
          <a href="/" style={{ color: 'white' }}>Stake</a>
        </div>
      </div>
    )
}

export default Drawer