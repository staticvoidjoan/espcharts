import React, {useState, useEffect} from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './UserDash.css';
import {Auth} from "aws-amplify"
import logo from "../../assets/navlogo.png"
import { useNavigate } from 'react-router-dom';
import awsExports from '../../aws-exports';
import { Hub } from 'aws-amplify';
Amplify.configure(awsExports);
const UserDash = () => {
  const [authenticated, setAuthenticated] = useState(true);
  
  useEffect(() => {
    checkAuthenticated();
    Hub.listen('auth', (data) => {
      const { payload } = data;
      if (payload.event === 'signIn') {
        window.location.reload();
      }
    
    });
  }, []);


  const checkAuthenticated = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      if (user) {
        setAuthenticated(true);
        
        
      } else {
        setAuthenticated(false);
      }
    } catch (error) {
      setAuthenticated(false);
    }
  };
  const navigate = useNavigate();
  const handleSignOut = () => {
    Auth.signOut().then(() => {
      window.location.reload();
    });
  };

  const toPlayers = () => {
    navigate("/players");
  }

  const toTeams = () => {
    navigate("/teams");
  }

  const toTournaments = () => {
    navigate("/tournaments");
  }


  return (
    <div className='user-dash-container'>
      <Authenticator signUpAttributes={["given_name", "family_name"]}>
        {({ signOut, user }) => (
          <main className='user-dash-content'>
            
            <img src={logo} alt="LOGO" className='dash-logo' />
          <h1 className='user-dash-title'>
            Hello, {user.attributes.given_name} {user.attributes.family_name}
          </h1>
          <h2 className='user-dash-subtitle'>
            Email: {user.attributes.email}
          </h2>
          <button className='user-dash-button' onClick={handleSignOut}>
            Sign out
          </button>
        </main>
        )}
      </Authenticator>
      {authenticated ?
        <div className='user-dash-content'>
            <h1 className='user-dash-title'>Navigate</h1>
            <button className='user-dash-button mb-2' onClick={toPlayers}>Players</button>
            <button className='user-dash-button mb-2'onClick={toTeams}>Teams</button>
            <button className='user-dash-button'onClick={toTournaments}>Tournaments</button>
        </div> : null
      
    }
    </div>
  );
};

export default UserDash;
