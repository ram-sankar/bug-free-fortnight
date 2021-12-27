import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return(
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="home" component={Home} />
    </Stack.Navigator>
  )
}