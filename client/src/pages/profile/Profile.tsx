import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../../store/user/userActions";
import { resetUser, setUser } from "../../store/user/userSlice";
import Friends from "../../components/friends/Friends";
import { getFriends } from "../../store/friend/friendActions";

function Profile() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { friends } = useSelector((state: RootState) => state.friends);
  const userData = useSelector((state: RootState) => state.user.user);
  const { userId } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 700px)");

  useEffect(() => {
    if (userId) {
      dispatch(getUser(+userId));
    } else {
      dispatch(getFriends());
      if (user) dispatch(setUser(user));
    }

    return () => {
      dispatch(resetUser());
    };
  }, [dispatch, user, userId]);
  console.log(friends);
  return (
    user && (
      <Grid
        container
        maxWidth={"md"}
        sx={{ p: "15px", mt: 5, marginInline: "auto" }}
      >
        <Grid
          item
          sm={8}
          md={6}
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
        </Grid>

        {!userId && (
          <Grid
            item
            borderRadius={2}
            boxShadow={"0 0 0 1px rgba(99, 99, 99, 0.2)"}
            xs={12}
            sm={4}
            md={4}
            padding={2}
          >
            <Typography variant="h6">My Friends</Typography>
            <Divider />
            {friends.map((friend) => (
              <Box key={friend.id}>
                <Friends friend={friend.user} />
              </Box>
            ))}
          </Grid>
        )}
      </Grid>
    )
  );
}

export default Profile;
