import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../utils/api";
import { AxiosConfig } from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface FavI {
  id: number;
  post: {
    id: number;
    content: string;
    createdAt: string;
    user: {
      id: number;
      name: string;
      picture: string;
    };
  };
}

export default function Favorit() {
  const [favs, setfavs] = useState<FavI[]>();
  const navigate = useNavigate();
  const { userData } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${API}/favorites`, AxiosConfig);
        setfavs(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    userData?.access_token && (
      <Grid container maxWidth="xl" className="p-2 justify-center">
        {favs &&
          favs.map((fav) => (
            <Grid item xs={12} sm={6} md={4} className="p-1 ">
              <Box className="sh rounded-lg p-1">
                <Box display={"flex"}>
                  <Avatar src={fav.post.user.picture} />
                  <Box ml={2} mb={3}>
                    <Button
                      variant="text"
                      className="pr-4 normal-case "
                      onClick={() => navigate(`/profile/${fav.post.user.id}`)}
                    >
                      {fav.post.user.name}
                    </Button>
                    <Typography variant="subtitle2" color={"gray"}>
                      {fav.post.createdAt.replace("T", " | ").split(".")[0]}
                    </Typography>
                  </Box>
                </Box>
                <Divider />
                <MDEditor.Markdown
                  className="p-2 h-80 overflow-scroll"
                  source={fav.post.content}
                />
                <Divider />

                <ButtonGroup className="w-full mt-3">
                  <Button
                    onClick={() => navigate(`/posts/${fav.post.id}`)}
                    variant="outlined"
                    className="w-full"
                  >
                    View Post
                  </Button>
                  <Button
                    onClick={async () => {
                      try {
                        const { data } = await axios.post(
                          `${API}/favorites`,
                          {
                            postId: fav.post.id,
                          },
                          AxiosConfig
                        );
                        if (data)
                          setfavs(
                            favs.filter((item) => item.post.id !== fav.post.id)
                          );
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                    className="w-full"
                    color="error"
                    variant="outlined"
                  >
                    remove
                  </Button>
                </ButtonGroup>
              </Box>
            </Grid>
          ))}
      </Grid>
    )
  );
}
