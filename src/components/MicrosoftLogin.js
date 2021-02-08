import React from 'react';
import {useState, useEffect} from 'react'
import {useMutation, useLazyQuery } from '@apollo/client';
import MicrosoftLogin from "react-microsoft-login";
import UserExistsQuery from '../queries/userExists.graphql';
import CreateUserMutation from '../mutations/CreateUser.graphql';
import SetAccessToken from '../mutations/SetAccessToken.graphql';

const MicrosoftUserLogin = ({navigateAfterLogin}) => {

  const authHandler = (err, data) => {
    const myToken = 'EwBoA8l6BAAU6k7+XVQzkGyMv7VHB/h4cHbJYRAAAX6MFxv2Xjp4R61lqCKxJsX2i8kDqO6tjDmJusWQoSOVrRZ8AsETLIW9+tihRTnyDne0IPPcYSmQIsx3S3xTcZhBN5IREI5MBK7heGDmcJduPwoaNAnS3RGgVDvuR1Lwtwj2lrhx7GBkJjGbOQDg44RYNy1SFnh/jiZW4DfB8at98iQaPq9WV9DKDiyMOYfhCyxd3oEDGKskkLyOGJZklxy4jN7R+u/JjwisHy9Nqk4WKRQWPBJ+wgOCgmxsJpwmfJxeEYiTn5xQiNSSwhc0y4O5TgZ0r21VJdSwnOGDZ1hhu5Hbt3fjNgAnQBpaFl+DIZIDj7olVstbZ2g/gdOVaDkDZgAACH/VRc1x08asOAK4lgho5L/iXKgGMsQMXuffy2Lvnos/ywDBhdx1Ad/awyqK+mlJ6pK6gAO7EKMLG6+3X5PiCNuMFOdaWNUFTt/SsihF2Yus/afhLn5DiuOk3g9XU0NJEhuKK8T3CIg9PslqHFrAxoX7OrLg0t0laU6ZO1S6mnG+5A08kP6nz9ACuZ3i3EPPdH8ZpHpuPxC0ig86AToWCZi0qJ7xb9E7CI0aEIFlCAMqJXcVrzfjXlKYqyCyx7HnV2NggWU69T8AGU+SdcYK9tH6vMg5tYCeh3rEUTRXGb01P/l5qlKNz7svgg6/4B+swGT7MBkw1MCYiIeEbHvUnchVwNYbrEh39z/YDHg9lrlhA2SpqzlaRdQ4VZh4Stcq2VYc6sQlmJ7/ufn2l1tGcyUzhN9GQL8+CJcqm8sbtmdsq5GY/6TPl+t7awnUTa8k/GFzRa/5bwGcdUwIjdyAc+2bV/wvfQ+YdvOlng5jCU0AufzwLMs2hy3YjFP9hK4S9QdzjzPpA9frE7ecwq6Af4RQ8wpfgTYhoiYIEA592lgUQzXZeWOfj/BZuBOh/ONbcLg8o2fVQ0M0ACX0BBAZ4IvL4NMlzrPgqRIPAuH2VaT0t0RgdezwS7UGM8+UCpdDwvPvBKRNA+RNpxFuqtAaj1D0w43OKrHJwarnvRcamQdCawtpjEwyiOOWLA2xuvGC07wQ16FQqOpOanOssfsVotCVypHG11QeaJaFLLyQ6hGu7EV4kMjDaeO3TMq9GHwg4hfveQI='
    console.log('access token same as before?: ', myToken === data.accessToken);
    console.log(err, data);

  };

  return (
    <MicrosoftLogin
      clientId='9b01cab8-031f-4e6c-adff-b668bee8523c'
      authCallback={authHandler}
      redirectUri='http://localhost:3000'
    />
  );
};

export default MicrosoftUserLogin;