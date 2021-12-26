import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import * as Linking from 'expo-linking';
import Home from './src/screens/Home';

const Stack = createNativeStackNavigator();
export default function App() {
  const a = Linking.createURL('home2')
  
 return (
   <NavigationContainer fallback={<Text>Loading...</Text>}>
     <Stack.Navigator screenOptions={{ headerShown: true }}>
          <Stack.Screen name="home" component={Home} />
        </Stack.Navigator>
   </NavigationContainer>
 );
}