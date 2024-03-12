import {
  Box,
  Button,
  Divider,
  Grid,
  GridProps,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { FeedRounded, PeopleAltRounded, PostAdd } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../store/user/userActions";
import AddPostModel from "../../components/posts/addPostModel";
import Post from "../../components/posts/Post";
import useGetPosts from "../../hooks/useGetPosts";
import Loading from "../../components/common/loading";

function Home() {
  const isMobile = useMediaQuery("(max-width: 700px)");
  const { userData } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [openAddPost, setOpenAddPost] = useState(false);
  const handleOpenAddPost = () => setOpenAddPost(true);
  const handleCloseAddPost = () => setOpenAddPost(false);
  const [more, setMore] = useState(false);
  const { isLoading, totalPosts, isDone } = useGetPosts({ more, setMore });

  useEffect(() => {
    if (!userData?.access_token) {
      console.log("user is found");
      navigate("/login");
    } else {
      dispatch(getMe());
    }
  }, [dispatch, navigate, userData?.access_token]);

  console.log(totalPosts);
  const gridStyle: GridProps = {
    padding: 2,
    borderRadius: 2,
  };
  return (
    userData?.access_token && (
      <Grid
        container
        maxWidth={"md"}
        p={1}
        justifyContent={"center"}
        margin={"auto"}
      >
        {
          <Grid item xs={12} sm={4} {...gridStyle} position={"relative"}>
            <Stack
              sx={{ bgcolor: "#29323b" }}
              {...gridStyle}
              direction={isMobile ? "row" : "column"}
              className="sticky top-20 w-full"
            >
              <IconButton
                onClick={handleOpenAddPost}
                color="primary"
                className="asideItem"
              >
                <PostAdd className="mr-3" /> {!isMobile && "add post"}
              </IconButton>
              <AddPostModel {...{ openAddPost, handleCloseAddPost }} />

              <IconButton color="primary" className="asideItem">
                <PeopleAltRounded className="mr-3" /> {!isMobile && "friends"}
              </IconButton>
            </Stack>
          </Grid>
        }
        <Grid item xs={12} sm={8} {...gridStyle}>
          <Typography variant="h5">
            News <FeedRounded fontSize="small" />
          </Typography>
          <Divider sx={{ bgcolor: "gray", mb: 3 }} />
          {totalPosts &&
            totalPosts.map((post) => (
              <Box key={post.id} marginBlock={3}>
                <Stack
                  bgcolor={"#101418"}
                  boxShadow={"0 0 0 1px rgba(99, 99, 99, 0.2)"}
                  borderRadius={2}
                >
                  <Post {...post} />
                </Stack>
              </Box>
            ))}
          {isLoading && <Loading className="w-60 h-60  mx-auto " />}
          {!isDone && (
            <Button
              onClick={() => {
                setMore(true);
              }}
              variant="outlined"
              className="w-3/4 mx-auto block"
            >
              More Posts
            </Button>
          )}
        </Grid>
      </Grid>
    )
  );
}

export default Home;
