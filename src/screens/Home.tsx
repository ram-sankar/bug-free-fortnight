import React, { useContext } from "react";
import { View, StyleSheet, Text, Button, Image } from "react-native";

import AuthContext from "../auth/context"
import AppButton from "../components/Button";
import useAuth from './../auth/useAuth';

function Home() {
  const auth = useAuth();
  const { user } = useContext(AuthContext);
  return (
      <View style={styles.container}>
        <Image
          source={{uri: user?.image}}
          style={styles.image}
        />
        <Text style={styles.userName}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <View style={styles.buttonContainer}>
          <AppButton title='Repositories' style={styles.logoutButton} onPress={auth.logOut} />
          <AppButton title='Logout' style={styles.logoutButton} onPress={auth.logOut} />
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 50
  },
  userName: {
    marginTop: 20,
    fontWeight: '700',
    fontSize: 22
  },
  email: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  logoutButton: {
    width: 150,
    marginHorizontal: 10
  }
});
export default Home;