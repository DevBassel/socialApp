import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { API } from "../../utils/api";
import { LoginGoogle } from "../../store/auth/authActions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Google } from "@mui/icons-material";

function Login() {
  const { userData } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const googlelogin = useGoogleLogin({
    // will send to backend
    onSuccess: async (codeResponse) => {
      const { data } = await axios.post(`${API}/auth/google`, {
        access_token: codeResponse.access_token,
      });
      console.log(data);
      dispatch(LoginGoogle(data.access_token));
    },
    flow: "implicit",
  });

  useEffect(() => {
    if (userData?.access_token) {
      navigate("/");
    } else {
      console.log("user not found");
    }
  }, [navigate, userData?.access_token]);

  return (
    !userData?.access_token && (
      <Stack
        component={"main"}
        maxWidth={"xs"}
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h3">Welcome,</Typography>
        <Box
          className={
            "bg-slate-400  container h-full w-fit rounded-xl items-center mx-auto p-3"
          }
        >
          <Box>
            <img
              className="w-96 block mx-auto"
              src="/assets/imgs/login.png"
              alt=""
            />
            <Divider className="text-3xl text-blue-950 font-extrabold mb-5">
              Go With
            </Divider>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="success"
              onClick={() => googlelogin()}
              className="px-4 py-2 mx-auto w-3/4 text-3xl text-center border cursor-pointer flex items-center gap-2 hover:border-slate-400 border-slate-200 rounded-lg hover:shadow transition duration-150"
            >
              <Google className="text-5xl" />
              Google
            </Button>
          </Box>
        </Box>
      </Stack>
    )
  );
}

export default Login;
