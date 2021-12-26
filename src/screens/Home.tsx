import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useAuthRequest } from 'expo-auth-session';
import { Button } from 'react-native';
import Config from "react-native-config";

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

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      console.log(code);
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