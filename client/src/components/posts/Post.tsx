import {
  Avatar,
  Box,
  Button,
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
import React, { useState } from "react";
import {
  DeleteRounded,
  EditRounded,
  MenuSharp,
  SaveAsRounded,
  ShareRounded,
  FavoriteBorder,
  ModeCommentTwoTone,
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
}: PostI) {
  const navigate = useNavigate();
  const currentUser = useSelector((state: RootState) => state.user.user);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [love, setLove] = useState<{
    active: boolean;
    count: number;
  }>({
    active: Boolean(userLovePost),
    count: loveCount,
  });

  const currentPath = useLocation().pathname;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const iconStyle: SxProps = { flexGrow: 1, borderRadius: 0 };
  return (
    <>
      <Box p={2} borderRadius={2}>
        <Box display={"flex"}>
          <Avatar src={user.picture} />
          <Box ml={2} mb={3}>
            <Button
              variant="text"
              sx={{ padding: 0, textTransform: "none" }}
              onClick={() => navigate(`/profile/${user.id}`)}
            >
              {user.name}
            </Button>
            <Typography variant="subtitle2" color={"gray"}>
              {createdAt.split("T")[0]}
            </Typography>
          </Box>
          <Box
            flexGrow={1}
            sx={{ cursor: "pointer" }}
            onClick={() =>
              currentPath !== `/posts/${id}` ? navigate(`/posts/${id}`) : false
            }
          ></Box>
          <Tooltip title="Options">
            <IconButton
              onClick={handleClick}
              sx={{ margin: "10px 0", padding: 1, height: 0 }}
            >
              <MenuSharp color="info" />
            </IconButton>
          </Tooltip>
        </Box>
        <MDEditor.Markdown
          className={`${
            isRTL(content) ? "text-right" : "text-left"
          } p-4 rounded-lg`}
          source={content}
        />
        <Typography>{media ? media : ""}</Typography>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {user.id === currentUser?.id ? (
            <Box>
              <MenuItem onClick={handleClose}>
                <Tooltip title="Edite post" placement="left">
                  <EditRounded />
                </Tooltip>{" "}
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Tooltip title="Delete post" placement="left">
                  <DeleteRounded color="error" />
                </Tooltip>
              </MenuItem>
            </Box>
          ) : (
            <Box>
              <MenuItem onClick={handleClose}>
                <Tooltip title="Share post" placement="left">
                  <ShareRounded />
                </Tooltip>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Tooltip title="Save post" placement="left">
                  <SaveAsRounded />
                </Tooltip>{" "}
              </MenuItem>
            </Box>
          )}
        </Menu>
      </Box>
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
          <FavoriteBorder fontSize="medium" />
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
    </>
  );
}
