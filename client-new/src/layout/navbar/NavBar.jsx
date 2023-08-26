import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import './NavBar.css';
import logo from "../../assets/navlogo.png"
function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar-main'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            <img src={logo} alt=""  style={{width:"50%"}}/>
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/players' className='nav-links' onClick={closeMobileMenu}>
                Players
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/teams'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Teams
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/tournaments'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Tournaments
              </Link>
            </li>

          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
