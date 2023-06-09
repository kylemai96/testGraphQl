import { useEffect } from "react";

import { Authenticator, useAuthenticator, View } from "@aws-amplify/ui-react";

import "@aws-amplify/ui-react/styles.css";

import { useNavigate, useLocation } from "react-router";
import NavBarHome from "./NavBarHome";

export function Login() {
  const { route } = useAuthenticator((context) => [context.route]);
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || "/owner"; //redirects to "/" if successful
  useEffect(() => {
    if (route === "authenticated") {
      navigate(from, { replace: true });
    }
  }, [route, navigate, from]);
  return (
    <>
    <NavBarHome/>
    <View className="auth-wrapper">
      {" "}
      {/*  Sign-in box */}
      <Authenticator></Authenticator>
    </View>
    </>
  );
}
