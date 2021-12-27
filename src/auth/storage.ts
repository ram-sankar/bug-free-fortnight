import * as SecureStore from 'expo-secure-store';

import HTTP from '../api/httpClient'
import { UserDetails } from './../common/model/user';

const token = "accessToken"
const user = "userDetails"

const storeToken = async (accessToken: string) => {
  try {
    await SecureStore.setItemAsync(token, accessToken);
    HTTP.setToken(accessToken);
  } catch (error) {
    console.log('Error storing the access token', error);
  }
}

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(token);
  } catch (error) {
    console.log('Error getting the auth token', error);
    return null;
  }
}

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(token);
  } catch (error) {
    console.log('Error removing the auth token', error);
  }
}

const storeUser = async (userDetails: UserDetails) => {
  try {
    return await SecureStore.setItemAsync(user, JSON.stringify(userDetails));
  } catch (error) {
    console.log('Error storing the user', error);
  }
}

const getUser = async () => {
  try {
    const userData = await SecureStore.getItemAsync(user);
    return JSON.parse(userData || '');
  } catch (error) {
    console.log('Error getting the user', error);
    return null;
  }
}

const removeUser = async () => {
  try {
    await SecureStore.deleteItemAsync(user);
  } catch (error) {
    console.log('Error removing the user', error);
  }
}

export default {
  getToken,
  removeToken,
  storeToken,
  storeUser,
  getUser,
  removeUser
}