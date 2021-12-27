import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import Repositories from './../screens/Repositories';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return(
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="repositories" component={Repositories} />
    </Stack.Navigator>
  )
}