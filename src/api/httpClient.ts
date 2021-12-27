import Axios from 'axios';

Axios.defaults.baseURL = "https://api.github.com"

function setToken(token: string) {
  Axios.defaults.headers.common["x-auth-token"] = token
}

export default {
  get: Axios.get,
  post: Axios.post,
  put: Axios.put,
  delete: Axios.delete,
  setToken
}