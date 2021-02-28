import React from 'react';
import {useState, useEffect, useContext} from 'react'
import {useMutation, useLazyQuery } from '@apollo/client';
import GoogleLogin from 'react-google-login';
import MicrosoftLogin from "react-microsoft-login";
import UserExistsQuery from '../queries/userExists.graphql';
import CreateUserMutation from '../mutations/CreateUser.graphql';
import SetAccessToken from '../mutations/SetAccessToken.graphql';
import { sessionContext } from './SessionContext';


const LoginButton = ({navigateAfterLogin, loginProvider}) => {
  const {setSessionContext} = useContext(sessionContext);
  const [userData, setUserData] = useState({});
  const [createUser] = useMutation(CreateUserMutation);
  const [setAccessToken] = useMutation(SetAccessToken);
  const [userExistsQuery, { data: userExistsData }] = useLazyQuery(UserExistsQuery);

  useEffect(() => {
    if (userExistsData && userExistsData.userExists) {
      const {firstName, lastName, emailAddress, imageUrl, accessToken} = userData;
      const { userExists: {exists, id} } = userExistsData;
      let userId = id;
      if (!exists) {
        createUser({ variables: { input: { firstName, lastName, emailAddress, imageUrl }}})
        .then((data) => {
          userId = data.data.createUser.id;
          setSessionContext(firstName, lastName, emailAddress, imageUrl, userId);
          setAccessToken({variables: {input: {userId , accessToken, imageUrl}}})
            .then((data) => {
              localStorage.setItem("accessToken", accessToken);
              navigateAfterLogin();
            });
        });
      } else {
        setSessionContext(firstName, lastName, emailAddress, imageUrl, userId);
        setAccessToken({variables: {input: {userId , accessToken, imageUrl}}})
          .then((data) => {
            localStorage.setItem("accessToken", accessToken);
            navigateAfterLogin();
          });
      }
    }
  }, [userExistsData]);

  
  const googleLoginSuccessHandler = async (response) => {
    loginSuccessHandler({
      accessToken: response.accessToken,
      firstName: response.profileObj.givenName,
      lastName: response.profileObj.familyName,
      emailAddress: response.profileObj.email,
      imageUrl: response.profileObj.imageUrl,
    })
  };

  const googleLoginRequestHandler = () => {
    console.log("login requested")
  };

  const microsoftHandler = (err, data) => {
    if (!err) {
      loginSuccessHandler({
        accessToken: data.accessToken,
        firstName: data.account.name.split(' ').slice(0, -1).join(' '),
        lastName: data.account.name.split(' ').slice(-1).join(' '),
        emailAddress: data.account.userName,
        imageUrl: 'not available',
      });
    }
  };

  const loginSuccessHandler = ({accessToken, firstName, lastName, emailAddress, imageUrl}) => {
    setUserData({ accessToken, firstName, lastName, emailAddress, imageUrl });
    userExistsQuery({ variables: { input: { emailAddress } }})
  };

  return (
    <>
    {
      loginProvider === 'google' ?
      <GoogleLogin
        clientId='520656774669-cu3glhtg7lagohl6aot0muen2gqtshsi.apps.googleusercontent.com'
        buttonText='Sign in with Google'
        onRequest={googleLoginRequestHandler}
        onSuccess={googleLoginSuccessHandler}
        onFailure={(e)=>console.log(e)}
        cookiePolicy={'single_host_origin'}
      >
      </GoogleLogin>
      :
      <MicrosoftLogin
        clientId='9b01cab8-031f-4e6c-adff-b668bee8523c'
        authCallback={microsoftHandler}
        redirectUri={process.env.NODE_ENV==='development' ? 'http://localhost:3000' : 'https://campusmarketapp.com'}
      />
    }
    </>
  )
};

export default LoginButton;