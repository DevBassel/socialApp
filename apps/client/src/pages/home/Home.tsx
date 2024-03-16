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
import {
  ChatRounded,
  FeedRounded,
  Groups,
  PeopleAltRounded,
  PostAdd,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../store/user/userActions";
import Post from "../../components/posts/Post";
import useGetPosts from "../../hooks/useGetPosts";
import Loading from "../../components/common/loading";

function Home() {
  const isMobile = useMediaQuery("(max-width: 700px)");
  const { userData } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
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

  const gridStyle: GridProps = {
    padding: 2,
    borderRadius: 2,
  };
  return (
    userData?.access_token && (
      <Grid
        container
        maxWidth={"xl"}
        p={1}
        justifyContent={"center"}
        margin={"auto"}
      >
        {
          <Grid
            item
            xs={12}
            sm={isMobile ? 12 : 3}
            {...gridStyle}
            position={"relative"}
          >
            <Stack
              {...gridStyle}
              direction={isMobile ? "row" : "column"}
              className="sticky top-20 bg-sc grow"
            >
              <IconButton
                onClick={() => navigate("/add-post")}
                color="primary"
                className="asideItem"
              >
                <PostAdd className="mr-3" /> {!isMobile && "add post"}
              </IconButton>

              <IconButton color="primary" className="asideItem">
                <PeopleAltRounded className="mr-3" /> {!isMobile && "friends"}
              </IconButton>

              <IconButton color="primary" className="asideItem">
                <Groups className="mr-3" /> {!isMobile && "find friends"}
              </IconButton>

              <IconButton color="primary" className="asideItem">
                <ChatRounded className="mr-3" /> {!isMobile && "Chats"}
              </IconButton>
            </Stack>
          </Grid>
        }

        <Grid
          item
          xs={12}
          sm={isMobile ? 12 : 6}
          className="bg-sc pb-4 rounded-md overflow-scroll"
        >
          <Divider className="sticky bg-main z-20 sh w-full top-0">
            <Typography variant="h5">
              News <FeedRounded fontSize="small" />
            </Typography>
          </Divider>
          {totalPosts &&
            totalPosts.map((post) => (
              <Box key={post.id} m={1}>
                <Stack className="bg-main rounded-md sh">
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
              variant="contained"
              color="success"
              className="w-3/4 mx-auto block font-extrabold text-gray-800"
            >
              More Posts
            </Button>
          )}
        </Grid>

        {!isMobile && (
          <Grid item sm={3} {...gridStyle}>
            <Stack
              {...gridStyle}
              direction={isMobile ? "row" : "column"}
              className="sticky top-20 w-full bg-sc"
            >
              <Divider className="text-lime-400">Onlins</Divider>
            </Stack>
          </Grid>
        )}
      </Grid>
    )
  );
}

export default Home;
