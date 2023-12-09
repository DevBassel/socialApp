import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import {
  Divider,
  Grid,
  GridProps,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { FeedRounded } from "@mui/icons-material";

function Home() {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate("/login");
  }, [navigate, user]);

  const isMobile = useMediaQuery("(max-width: 899px)");

  console.log(isMobile);

  const gridStyle: GridProps = {
    padding: 2,
    borderRadius: 2,
  };
  return (
    user && (
      <Grid container maxWidth={"md"} margin={"auto"}>
        {!isMobile && (
          <Grid item xs={12} md={4} {...gridStyle} position={"relative"}>
            <Stack
              sx={{ bgcolor: "#29323b" }}
              {...gridStyle}
              direction={"row"}
              position={"sticky"}
              alignItems={"center"}
              top={64}
            ></Stack>
          </Grid>
        )}
        <Grid item xs={12} md={7} {...gridStyle}>
          <Stack sx={{ bgcolor: "#29323b" }} {...gridStyle}>
            <Typography variant="h5">
              News <FeedRounded fontSize="small" />
            </Typography>
            <Divider sx={{ bgcolor: "gray" }} />
          </Stack>
        </Grid>
      </Grid>
    )
  );
}

export default Home;
