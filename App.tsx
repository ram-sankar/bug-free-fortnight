import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';

import AuthNavigator from './src/Navigator/AuthNavigator';
import AppNavigator from './src/Navigator/AppNavigator';
import storage from './src/auth/storage';
import AuthContext from "./src/auth/context";
import { UserDetails } from './src/common/model/user';

const Stack = createNativeStackNavigator();
export default function App() {
  const [user, setUser] = useState<UserDetails>();

  useEffect(()=>{
    restoreUser();
  },[])

  console.log(user);

  const restoreUser = async () => {
    const userData = await storage.getUser()
    if(userData) setUser(userData);
  }
  
 return (
    <AuthContext.Provider value={{user, setUser}}>
      <NavigationContainer fallback={<Text>Loading...</Text>}>
        {user?.name ? <AppNavigator /> : <AuthNavigator /> }
    </NavigationContainer>
   </AuthContext.Provider>
 );
}