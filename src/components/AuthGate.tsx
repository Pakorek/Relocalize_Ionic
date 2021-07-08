import { useCookies } from "react-cookie";
import Signin from '../pages/Signin';
import { useAuthToken } from "../hooks/auth";
import Myspace from '../pages/Myspace';
const React = require('react');

export const AuthGate = () => {
  const [authToken] = useAuthToken();
  const [cookies, ,] = useCookies(["user"]);

  if (cookies && authToken) return <Myspace />;

  return <Signin />;
};
