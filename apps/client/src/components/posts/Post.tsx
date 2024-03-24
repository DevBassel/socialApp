import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  SxProps,
  Tooltip,
  Typography,
} from "@mui/material";
import { Post as PostI } from "../../store/posts/post-interfaces";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useRef, useState } from "react";
import {
  DeleteRounded,
  EditRounded,
  MenuSharp,
  FavoriteBorder,
  ModeCommentTwoTone,
  FavoriteBorderOutlined,
  FavoriteSharp,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import MDEditor from "@uiw/react-md-editor";
import { isRTL } from "../../utils/IsRtl";
import axios from "axios";
import { API } from "../../utils/api";
import { AxiosConfig } from "../../utils/axiosConfig";

export default function Post({
  id,
  content,
  media,
  user,
  createdAt,
  commentCount,
  loveCount,
  userLovePost,
  userFavPost,
}: PostI) {
  const navigate = useNavigate();
  const currentUser = useSelector((state: RootState) => state.user.user);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const postRef = useRef<HTMLElement>(null);
  const [editPost, setEditPost] = useState(false);
  const [newContent, setNewContent] = useState<{
    content: string;
    lang: string;
  }>({
    content,
    lang: isRTL(content) ? "ar" : "en",
  });

  const [love, setLove] = useState<{
    active: boolean;
    count: number;
  }>({
    active: Boolean(userLovePost),
    count: loveCount,
  });
  const [fav, setFav] = useState(Boolean(userFavPost));

  const currentPath = useLocation().pathname;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const iconStyle: SxProps = { flexGrow: 1, borderRadius: 0 };
  return (
    currentUser && (
      <Box ref={postRef} className="bg-main rounded-md sh">
        <Box p={2} borderRadius={2}>
          <Box display={"flex"}>
            <Avatar src={user.picture} />
            <Box ml={2} mb={3}>
              <Button
                variant="text"
                className="pr-4 normal-case "
                onClick={() => navigate(`/profile/${user.id}`)}
              >
                {user.name}
              </Button>
              <Typography variant="subtitle2" color={"gray"}>
                {createdAt.replace("T", " | ").split(".")[0]}
              </Typography>
            </Box>
            <Box
              flexGrow={1}
              sx={{ cursor: "pointer" }}
              onClick={() =>
                currentPath !== `/posts/${id}`
                  ? navigate(`/posts/${id}`)
                  : false
              }
            ></Box>
            <Tooltip title="Options">
              <IconButton
                className="my:2 p-1 h-fit rounded-md"
                onClick={handleClick}
              >
                <MenuSharp color="info" />
              </IconButton>
            </Tooltip>
          </Box>

          {editPost ? (
            <MDEditor
              value={newContent?.content}
              lang={newContent?.lang}
              direction={newContent?.lang === "ar" ? "rtl" : "ltr"}
              onChange={(newValue) => {
                console.log(isRTL(String(newValue)) ? "ar" : "en");
                setNewContent({
                  content: newValue || "",
                  lang: isRTL(String(newValue)) ? "ar" : "en",
                });
              }}
            />
          ) : (
            <MDEditor.Markdown
              className={`${
                isRTL(newContent.content) ? "text-right" : "text-left"
              } p-4 rounded-lg`}
              source={newContent.content}
            />
          )}
          <Typography>{media ? media : ""}</Typography>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            {user.id === currentUser?.id ? (
              <Box>
                <Tooltip title="Edite post" placement="left">
                  <MenuItem
                    onClick={() => {
                      setEditPost(true);
                      handleClose();
                    }}
                  >
                    <EditRounded />
                  </MenuItem>
                </Tooltip>

                <MenuItem
                  onClick={async () => {
                    try {
                      await axios.delete(`${API}/posts/${id}`, AxiosConfig);
                      postRef.current?.remove();
                      navigate("/");
                    } catch (error) {
                      console.log(error);
                    }
                    handleClose();
                  }}
                >
                  <Tooltip title="Delete post" placement="left">
                    <DeleteRounded color="error" />
                  </Tooltip>
                </MenuItem>
              </Box>
            ) : (
              <Box>
                <Tooltip title="add to favorite" placement="left">
                  <MenuItem
                    onClick={async () => {
                      try {
                        const { data } = await axios.post(
                          `${API}/favorites`,
                          {
                            postId: id,
                          },
                          AxiosConfig
                        );
                        if (data) setFav(data.status);
                      } catch (error) {
                        console.log(error);
                      }
                      handleClose();
                    }}
                  >
                    {fav ? (
                      <FavoriteSharp color="error" />
                    ) : (
                      <FavoriteBorderOutlined />
                    )}
                  </MenuItem>
                </Tooltip>
              </Box>
            )}
          </Menu>
        </Box>

        {editPost && (
          <ButtonGroup className="w-full justify-center [&_*]:w-full p-3 ">
            <Button
              onClick={async () => {
                try {
                  await axios.patch(
                    `${API}/posts/${id}`,
                    {
                      content: newContent.content,
                    },
                    AxiosConfig
                  );
                  setEditPost(false);
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              submit
            </Button>
            <Button
              color="warning"
              onClick={() => {
                setNewContent({
                  content,
                  lang: newContent.content,
                });
                setEditPost(false);
              }}
            >
              cancel
            </Button>
          </ButtonGroup>
        )}

        <Divider color={"gray"} />
        <Box display={"flex"} flexBasis={"auto"} textAlign={"center"}>
          <IconButton
            sx={iconStyle}
            color={love.active ? "error" : "inherit"}
            onClick={async () => {
              try {
                const { data } = await axios.post(
                  `${API}/posts/love`,
                  { postId: id },
                  AxiosConfig
                );
                if (data) {
                  setLove({
                    active: !love.active,
                    count: love.active ? love.count - 1 : love.count + 1,
                  });
                }
              } catch (error) {
                console.log(error);
              }
            }}
          >
            {!love.active ? <FavoriteBorder /> : <FavoriteSharp />}
            <Typography ml={2} variant="subtitle1">
              {love.count}
            </Typography>
          </IconButton>
          <IconButton
            onClick={() =>
              currentPath !== `/posts/${id}` ? navigate(`/posts/${id}`) : false
            }
            sx={iconStyle}
            color="inherit"
          >
            <ModeCommentTwoTone />
            <Typography ml={2} variant="subtitle1">
              {commentCount}
            </Typography>
          </IconButton>
        </Box>
      </Box>
    )
  );
}
