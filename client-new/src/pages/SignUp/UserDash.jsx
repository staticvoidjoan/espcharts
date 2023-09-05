import React from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import "./UserDash.css"

import awsExports from '../../aws-exports';
Amplify.configure(awsExports);

const UserDash = () => {
    return (
      <div className='user-dash-container'>
        <Authenticator signUpAttributes={["given_name", "family_name"]}>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.attributes.given_name}</h1>
          {console.log(user.given_name)}
        
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
      </div>
    );
}

export default UserDash;
