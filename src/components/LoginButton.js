import React from 'react';
import {useState, useEffect} from 'react'
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { useContext } from 'react';
import { sessionContext } from './SessionContext';
import GoogleLogin from 'react-google-login';
import UserExistsQuery from '../queries/userExists.graphql';
import CreateUserMutation from '../mutations/CreateUser.graphql';
import SetLoginStatus from '../mutations/SetLoginStatus.graphql';

const LoginButton = ({navigateAfterLogin}) => {
  const [userData, setUserData] = useState({});
  const [createUser] = useMutation(CreateUserMutation);
  const [setLoginStatus] = useMutation(SetLoginStatus);
  const [userExistsQuery, { loading, data: userExistsData }] = useLazyQuery(UserExistsQuery);
  const {value, setUserContext, setContextLoggedOut} = useContext(sessionContext);

  useEffect(() => {
    if (userExistsData != null) {
      const { userExists: {exists, id} } = userExistsData;
      let userId = id;
      if (!exists) {
        createUser({ variables: { input: { firstName: userData.firstName, lastName: userData.lastName, emailAddress: userData.emailAddress, imageUrl: userData.imageUrl }}})
        .then((data) => userId = data.createUser.id);
      }
      setLoginStatus({variables: {input: {userId , accessToken: userData.accessToken, loggedIn: true, imageUrl: userData.imageUrl}}})
          .then((data) => console.log("login status mutation: ", data));
      localStorage.setItem("accessToken", userData.accessToken);
      navigateAfterLogin();
    }
  }, [userExistsData]);

  
  const loginSuccessHandler = async (response) => {
    setUserData({
      accessToken: response.accessToken,
      firstName: response.profileObj.givenName,
      lastName: response.profileObj.familyName,
      emailAddress: response.profileObj.email,
      imageUrl: response.profileObj.imageUrl,
    })
    userExistsQuery({ variables: { input: { emailAddress: response.profileObj.email } }})
  }

  const loginRequestHandler = () => {
    localStorage.setItem("accessToken", "");
  };

  return (
    <GoogleLogin 
      clientId='520656774669-cu3glhtg7lagohl6aot0muen2gqtshsi.apps.googleusercontent.com' 
      buttonText='login'
      onRequest={loginRequestHandler}
      onSuccess={loginSuccessHandler} 
      onFailure={(e)=>console.log(e)} 
      cookiePolicy={'single_host_origin'}
    >
    </GoogleLogin>
  )
}

export default LoginButton;