import {
  Box,
  Button,
  Divider,
  Grid,
  GridProps,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { PeopleAltRounded, StarBorderSharp } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../store/user/userActions";
import Post from "../components/posts/Post";
import useGetPosts from "../hooks/useGetPosts";
import Loading from "../components/common/loading";
import useIsShow from "../hooks/useIsShow";

function Home() {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const { userData } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const loadMoreRef = useRef(null);
  const isShow = useIsShow(loadMoreRef);
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

  useEffect(() => {
    if (!isDone && isShow) {
      setMore(true);
    }
  }, [isDone, isShow]);

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
        {!isMobile && (
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
              <IconButton color="primary" className="asideItem">
                <PeopleAltRounded className="mr-3" /> friends
              </IconButton>

              <IconButton
                color="primary"
                className="asideItem"
                onClick={() => navigate("/favorites")}
              >
                <StarBorderSharp className="mr-3" /> favorites
              </IconButton>
            </Stack>
          </Grid>
        )}

        <Grid
          item
          xs={12}
          sm={isMobile ? 12 : 5}
          className=" pb-4 rounded-md overflow-scroll"
        >
          {totalPosts &&
            totalPosts.map((post) => (
              <Box key={post.id} m={1}>
                <Post {...post} />
              </Box>
            ))}
          {isLoading && <Loading className="w-60 h-60  mx-auto " />}
          {!isDone && (
            <Button
              ref={loadMoreRef}
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
