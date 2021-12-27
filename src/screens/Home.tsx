import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import AuthContext from "../auth/context"

function Home() {
  const { user } = useContext(AuthContext);
  return (
      <View>
        <Text>Welcome {user?.name}</Text>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  }
});
export default Home;