import { Stack } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import Swal from "sweetalert2";
import { LoginAction } from "../../store/auth/authActions";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
  const { user } = useSelector((state: RootState) => state.auth);

  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (user && user?.id) {
      Swal.fire({
        titleText: "Login Success",
        icon: "success",
      }).then(() => {
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
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          credentialResponse.credential &&
            dispatch(LoginAction(credentialResponse?.credential));
        }}
        onError={() => {
          Swal.fire({
            title: "Login Failed",
            icon: "error",
          });
        }}
        useOneTap
      />
    </Stack>
  );
}

export default Login;
