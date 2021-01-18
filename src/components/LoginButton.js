import React from 'react';
import {useState, useEffect} from 'react'
import {useMutation, useLazyQuery, useQuery } from '@apollo/client';
import GoogleLogin from 'react-google-login';
import UserExistsQuery from '../queries/userExists.graphql';
import CreateUserMutation from '../mutations/CreateUser.graphql';
import SetAccessToken from '../mutations/SetAccessToken.graphql';
import StoreItems from '../queries/StoreItems.graphql';

const LoginButton = ({navigateAfterLogin}) => {
  const [userData, setUserData] = useState({});
  const [createUser] = useMutation(CreateUserMutation);
  const [setAccessToken] = useMutation(SetAccessToken);
  const [email, setEmail] = useState('');
  //const { data: userExistsData, refetch } = useQuery(UserExistsQuery, { variables: { input: { emailAddress: email } }, fetchPolicy: "no-cache"});
  const [userExistsQuery, { data: userExistsData }] = useLazyQuery(UserExistsQuery);

  // const {data: storeItemsData} = useQuery(StoreItems, {
  //   variables: {
  //     input: {
  //       page: 1,
  //       filters: []
  //     }
  //   },
  //   fetchPolicy: "no-cache"
  // });
  //
  // useEffect(() => {
  //   console.log(storeItemsData)
  // }, [storeItemsData])


  useEffect(() => {
    console.log(userExistsData)
    if (userExistsData && userExistsData.userExists) {
      const { userExists: {exists, id} } = userExistsData;
      let userId = id;
      if (!exists) {
        createUser({ variables: { input: { firstName: userData.firstName, lastName: userData.lastName, emailAddress: userData.emailAddress, imageUrl: userData.imageUrl }}})
        .then((data) => userId = data.createUser.id);
      }
      console.log("before set token")
      setAccessToken({variables: {input: {userId , accessToken: userData.accessToken, imageUrl: userData.imageUrl}}})
          .then((data) => {
            console.log("return from setaccesstoken: ", data)
            localStorage.setItem("accessToken", userData.accessToken);
            navigateAfterLogin();
          });
    }
  }, [userExistsData]);

  
  const loginSuccessHandler = async (response) => {
    console.log(response)
    setUserData({
      accessToken: response.accessToken,
      firstName: response.profileObj.givenName,
      lastName: response.profileObj.familyName,
      emailAddress: response.profileObj.email,
      imageUrl: response.profileObj.imageUrl,
    });
    userExistsQuery({ variables: { input: { emailAddress: response.profileObj.email } }})
  }

  const loginRequestHandler = () => {
    //localStorage.setItem("accessToken", "");
    console.log("login requested")
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