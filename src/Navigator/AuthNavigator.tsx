import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return(
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" component={Login} />
    </Stack.Navigator>
  )
}