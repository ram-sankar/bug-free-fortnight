import React, { useContext } from "react";
import { View, StyleSheet, Text, Button } from "react-native";

import AuthContext from "../auth/context"
import useAuth from './../auth/useAuth';

function Home() {
  const auth = useAuth();
  const { user } = useContext(AuthContext);
  return (
      <View>
        <Text>Welcome {user?.name}</Text>
        <Button
          title="Logout"
          onPress={() => { auth.logOut(); }}
        />
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  }
});
export default Home;