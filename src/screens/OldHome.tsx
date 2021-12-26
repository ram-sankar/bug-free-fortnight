import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Axios from "axios";
import { WebView } from 'react-native-webview';
import Config from "react-native-config";

function Home() {
  const [isWebViewVisible, setIsWebViewVisible] = useState(true);
  const [accessCode, setAccessCode] = useState('');
  const [accessToken, setAccessToken] = useState('');
  
  console.log('accessCode1', accessCode);
  const getAccessToken = async () => {
    
    try {
      const res = await Axios.post('https://github.com/login/oauth/access_token', 
      {},
      {
        params: {
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          code: accessCode
        },
        headers: {
          'content-type': 'text/json',
          'Accept': 'application/json'
        }
      })
      console.log(res.data);
      setAccessToken(res.data.access_token)
      } catch (e: any) {
        console.log('error', e?.message);
      }
  }
  getAccessToken();

  const onNavigationStateChange = (navState: any) => {
    if (navState.title === 'OAuth application authorized') {
      setIsWebViewVisible(!isWebViewVisible);
    }
    let regex = /[?&]([^=#]+)=([^&#]*)/g, params:{[key: string]: string} = {}, match: RegExpExecArray | null;
    console.log('navState', navState);

    while ((match = regex.exec(navState.url))) {
      params[match[1]] = match[2]
    }
    const { code } = params
    if (code) {
      setAccessCode(code);
      console.log('accessCode2', code);
      setIsWebViewVisible(!isWebViewVisible);
      getAccessToken();
    }
  }

  return (
    <>
      {isWebViewVisible ? <WebView 
        source={{ uri: `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=repo user` }} 
        onNavigationStateChange={onNavigationStateChange}
      />: <Text>{accessCode}</Text>}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  }
});
export default Home;