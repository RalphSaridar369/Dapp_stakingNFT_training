import React, {useState, useEffect} from 'react';
import './Navbar.css';

const Navbar = ({ account }) => {
  // const [icon, setIcon] = useState();
  // useEffect(() => {
  // }, [])
  
  return (
    <div className='navbar'>
      <div className='navbar__left'>
        <a href="/">Whitelist</a>
        <a href="/dashboard">Dashboard</a>
        <a href="/">Stake</a>
      </div>
      <div className='navbar__right'>
        <p>{account}</p>
      </div>
    </div>
  )
}

export default Navbar