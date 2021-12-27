import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useAuthRequest } from 'expo-auth-session';
import { Button } from 'react-native';
import Config from "react-native-config";
import Axios, {AxiosError} from 'axios';

import HTTP from '../api/httpClient';
import Auth from "../auth/storage"
import { useEffect } from 'react';

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: 'https://github.com/settings/connections/applications/<CLIENT_ID>',
};

export default function Home2() {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: process.env.CLIENT_ID || '',
      scopes: ['repo', 'user'],
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: process.env.REDIRECT_URL || '',
    },
    discovery
  );

  useEffect(()=>{
    getUserDetails();
  },[])

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      getAccessToken(code);
    }
  }, [response]);

  const getUserDetails = async () => {
    try {
      const res = await HTTP.get('/user');
      console.log(res.data);
    } catch (e) {
      const error = e as AxiosError;
      console.log(error.message);
    }
  }

  const getAccessToken = async (code: string) => {
    try {
      const response = await Axios.post(discovery.tokenEndpoint, {}, {
        params: {
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          code
        },
        headers: {
          'content-type': 'text/json',
          'Accept': 'application/json'
        }
      })
      if (response.data?.access_token) {
        await Auth.storeToken(response.data?.token_type + ' ' + response.data?.access_token);
        getUserDetails();
      }
    } catch (e) {
      const error = e as AxiosError;
      console.log(error.message);
    }
    
  }

  return (
    <Button
      disabled={!request}
      title="Login"
      onPress={() => {
        promptAsync();
        }}
    />
  );
}