import { useContext } from "react";

import AuthContext from "./context"
import authStorage from "./storage";

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = async () => {
    const userData = await authStorage.getUser();
    setUser(userData);
  }

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
    authStorage.removeUser();
  }

  return { user, logIn, logOut };
}

export default useAuth;