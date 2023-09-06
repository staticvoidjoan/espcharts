import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import './NavBar.css';
import logo from "../../assets/navlogo.png"
import {Auth} from "aws-amplify"
function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [givenName,setGivenName] = useState("");
  const [lastName,setLastName] = useState("");

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
    checkAuthenticated();
    showButton();
  }, []);

  const checkAuthenticated = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }

      const userAttributes = user.attributes || {};
      const userGivenName = userAttributes.given_name || "";
      setGivenName(userGivenName);
    } catch (error) {
      setAuthenticated(false);
    }
  };

  const userInfo = async () => {
    const userinfo = Auth.currentUserInfo();
    return userinfo;
  }
  window.addEventListener('resize', showButton);

  Auth.currentUserInfo()
    .then(userInfo => {
      if (userInfo && userInfo.attributes && userInfo.attributes.given_name) {
        const givenName = userInfo.attributes.given_name;
        const lastName = userInfo.attributes.family_name;
        setLastName(lastName)
        setGivenName(givenName);
      }
    })
    .catch(error => {
      console.error('Error getting user info:', error);
    })

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
              <Link to={authenticated ? "/players" : "/nologinerror"} className='nav-links' onClick={closeMobileMenu}>
                Players
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to={authenticated ? "/teams" : "/nologinerror"}
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Teams
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to={authenticated ? "/tournaments" : "/nologinerror"}
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Tournaments
              </Link>
            </li>
      {authenticated ?
      (
            <li className='nav-item'>
              <Link
                to='/signup'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                {givenName} {lastName}
              </Link>
            </li>

      ) : null
      }

          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
