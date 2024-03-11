import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useParams } from "react-router-dom";

function Profile() {
  const userData = useSelector((state: RootState) => state.user.user);
  const { userId } = useParams();
  const isMobile = useMediaQuery("(max-width: 700px)");

  return (
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
        </Grid>
      )}
    </Grid>
  );
}

export default Profile;
