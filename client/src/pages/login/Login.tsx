import { Stack } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import Swal from "sweetalert2";
import { LoginAction } from "../../store/auth/authActions";

interface GoogleResponse {
  clientId: string;
  client_id: string;
  credential: string;
  select_by: string;
}

function Login() {
  const { user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user_data")) navigate("/");
    else {
      const checkClient = setInterval(() => {
        if (window.google) {
          clearInterval(checkClient);
          google.accounts.id.initialize({
            client_id:
              "227197526966-8skthv8r9oiaaldetn6uk2msoct51gml.apps.googleusercontent.com", // Your client ID from Google Cloud
            callback: async (res: GoogleResponse) => {
              dispatch(LoginAction(res.credential));
            },
          });
          // google button
          google.accounts.id.renderButton(
            document.getElementById("google-login-btn"),
            {
              type: "standard",
              theme: "filled_blue",
              size: "large",
              text: "signin_with",
              shape: "rectangular",
            }
          );
          // google prompt
          google.accounts.id.prompt();
        }
        console.log(1);
      }, 300);
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (user) {
      Swal.fire({
        titleText: "Login Success",
        icon: "success",
      }).then((popup) => {
        navigate("/");
        window.location.reload();
      });
    }
  }, [navigate, user]);

  return (
    <Stack
      component={"main"}
      maxWidth={"xs"}
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <div id="google-login-btn"> </div>
    </Stack>
  );
}

export default Login;
