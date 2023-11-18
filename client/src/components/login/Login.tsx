import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import cls from "./login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const API: string = "http://127.0.0.1:3000/api/auth/google/login";
  const navigate = useNavigate();

  return (
    <>
      {!localStorage.getItem("access_token") && (
        <GoogleOAuthProvider clientId="227197526966-8skthv8r9oiaaldetn6uk2msoct51gml.apps.googleusercontent.com">
          <div className={cls.google}>
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                console.log(credentialResponse);
                const res = await axios.post(API, {
                  access_token: credentialResponse.credential,
                });
                if (res.status === 201) {
                  localStorage.setItem("access_token", res.data.access_token);
                  navigate("/");
                  window.location.reload();
                }
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
            ;
          </div>
        </GoogleOAuthProvider>
      )}
    </>
  );
}
