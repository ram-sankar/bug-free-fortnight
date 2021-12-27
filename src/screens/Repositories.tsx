import React, { useContext } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { NavigationContext } from '@react-navigation/native';

import AuthContext from "../auth/context"
import AppButton from "../components/Button";

function Repositories() {
  const { user } = useContext(AuthContext);
  return (
      <View style={styles.container}>
        <Text style={styles.userName}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
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
export default Repositories;