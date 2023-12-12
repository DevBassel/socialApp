import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import {
  Box,
  Divider,
  Grid,
  GridProps,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { FeedRounded } from "@mui/icons-material";
import Post from "../../components/posts/Post";
import { getPosts } from "../../store/posts/postActions";

function Home() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { posts } = useSelector((state: RootState) => state.posts);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (!user) navigate("/login");
  }, [navigate, user]);

  const isMobile = useMediaQuery("(max-width: 700px)");

  console.log(isMobile);

  const gridStyle: GridProps = {
    padding: 2,
    borderRadius: 2,
  };

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    user && (
      <Grid container maxWidth={"md"} justifyContent={"center"} margin={"auto"}>
        {!isMobile && (
          <Grid item xs={12} sm={4} {...gridStyle} position={"relative"}>
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
        <Grid item xs={12} sm={8} {...gridStyle}>
          <Stack key={Math.random()} sx={{ bgcolor: "#29323b" }} {...gridStyle}>
            <Typography variant="h5">
              News <FeedRounded fontSize="small" />
            </Typography>
            <Divider sx={{ bgcolor: "gray", mb: 3 }} />
            {posts &&
              posts.map((post) => (
                <Box key={post.id}>
                  <Stack bgcolor={"#101418"} {...gridStyle}>
                    <Post {...post} />
                  </Stack>
                  <Divider sx={{ bgcolor: "gray", marginBlock: 2 }} />
                </Box>
              ))}
          </Stack>
        </Grid>
      </Grid>
    )
  );
}

export default Home;
