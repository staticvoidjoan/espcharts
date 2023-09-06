// authUtils.js
import {Auth} from 'aws-amplify';

export async function getToken() {
  try {
    const user = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;
    return token;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null; // Return null in case of an error
  }
}