import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  Avatar,
  Box,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../../store/user/userActions";
import { resetUser, setUser } from "../../store/user/userSlice";

function Profile() {
  const { user } = useSelector((state: RootState) => state.auth);
  const userData = useSelector((state: RootState) => state.user.user);
  const { userId } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 700px)");

  useEffect(() => {
    if (userId) {
      dispatch(getUser(+userId));
    } else {
      if (user) dispatch(setUser(user));
    }

    return () => {
      dispatch(resetUser());
    };
  }, [dispatch, user, userId]);

  return (
    user && (
      <Container maxWidth={"md"} sx={{ p: "15px", mt: 5 }}>
        <Stack
          display={"flex"}
          width={"fit-content"}
          m={"auto"}
          flexDirection={isMobile ? "column" : "row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Avatar
            src={userData?.picture}
            sx={{ width: 100, height: 100, mb: 5 }}
          />
          <Box ml={5} textAlign={isMobile ? "center" : "left"}>
            <Typography variant={"h5"}>{userData?.name}</Typography>
            <Typography variant={"h6"} lineHeight={3}>
              {userData?.email}
            </Typography>
            <Typography variant={"h6"}>
              Joined at{" "}
              <Typography
                color={"#1976d2"}
                fontWeight={"bold"}
                component={"span"}
              >
                {userData?.createdAt}
              </Typography>
            </Typography>
          </Box>
        </Stack>
      </Container>
    )
  );
}

export default Profile;
