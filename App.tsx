import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';

import HTTP from './src/api/httpClient';
import Home from './src/screens/Home';
import AuthNavigator from './src/Navigator/AuthNavigator';
import AppNavigator from './src/Navigator/AppNavigator';

const Stack = createNativeStackNavigator();
export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(()=>{
    getUserDetails();
  },[])

  const getUserDetails = async () => {
    try {
      const res = await HTTP.get('/user');
      console.log(res.data);
      setIsUserLoggedIn(true);
      console.log('res.data');
    } catch (e) {
      const error = e as AxiosError;
      console.log(error.message);
    }
  }
  
 return (
   <NavigationContainer fallback={<Text>Loading...</Text>}>
      {isUserLoggedIn ? <AppNavigator /> : <AuthNavigator /> }
   </NavigationContainer>
 );
}