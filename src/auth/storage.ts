import * as SecureStore from 'expo-secure-store';

const key = "accessToken"

const storeToken = async (accessToken: string) => {
  try {
    await SecureStore.setItemAsync(key, accessToken);
  } catch (error) {
    console.log('Error storing the access token', error);
  }
}

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log('Error getting the auth token', error);
    return null;
  }
}

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log('Error removing the auth token', error);
  }
}

export default {
  getToken,
  removeToken,
  storeToken
}