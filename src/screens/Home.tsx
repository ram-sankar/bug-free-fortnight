import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useAuthRequest } from 'expo-auth-session';
import { Button } from 'react-native';
import Config from "react-native-config";
import Axios from 'axios';

import Auth from "../auth/storage"
import { useEffect } from 'react';

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: 'https://github.com/settings/connections/applications/<CLIENT_ID>',
};


export default function Home2() {
  useEffect(()=>{
    fun();
  })
  const fun = async () => {
    Axios.defaults.headers.common["Authorization"] = await Auth.getToken() || '';
    try {
      const res = await Axios.get('https://api.github.com/user');
      console.log('a', res.data);
    } catch (e: any) {
      console.log(e.response);
    }
  }
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: process.env.CLIENT_ID || '',
      scopes: ['repo', 'user'],
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: process.env.REDIRECT_URL || '',
    },
    discovery
  );

  const getAccessToken = async (code: string) => {
    const response = await Axios.post(discovery.tokenEndpoint, {},
      {
        params: {
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          code: code
        },
        headers: {
          'content-type': 'text/json',
          'Accept': 'application/json'
        }
      })
    console.log(response.data);
    if (response.data?.access_token) {
      await Auth.storeToken(response.data?.token_type + ' ' + response.data?.access_token);
      fun();
    }
    
  }

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      getAccessToken(code);
    }
  }, [response]);

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