import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useAuthRequest } from 'expo-auth-session';
import { StyleSheet, Text, View } from 'react-native';
import Config from "react-native-config";
import Axios, {AxiosError} from 'axios';

import Auth from "../auth/storage"
import { useEffect } from 'react';
import HTTP from '../api/httpClient';
import useAuth from './../auth/useAuth';
import { UserDetails } from './../common/model/user';
import AppButton from '../components/Button';
import { colors, fonts, sizes } from '../common/theme';

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: 'https://github.com/settings/connections/applications/<CLIENT_ID>',
};

export default function Login() {
  const auth = useAuth();
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: process.env.CLIENT_ID || '',
      scopes: ['repo', 'user'],
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: process.env.REDIRECT_URL || '',
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      getAccessToken(code);
    }
  }, [response]);

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

  const getUserDetails = async () => {
    try {
      const res = await HTTP.get('/user');
      const { name, login, email, avatar_url } = res.data;
      const userDetails: UserDetails = {name, userName: login, email, image: avatar_url}
      await Auth.storeUser(userDetails);
      auth.logIn();
    } catch (e) {
      const error = e as AxiosError;
      console.log(error.message);
    }
  }

  return (
      <View style={styles.container}>
        <Text style={styles.loginText}>Login to Application using </Text>
        <Text style={styles.githubText}>Github OAuth Authentication</Text>
        <AppButton 
          disable={!request}
          title="Github Login"
          onPress={()=>{promptAsync()}} 
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  loginText: {
    fontWeight: '700',
    fontSize: sizes.fontL,
    color: colors.primary
  },
  githubText: {
    fontWeight: '700',
    fontSize: sizes.fontL,
    color: colors.black
  }
});