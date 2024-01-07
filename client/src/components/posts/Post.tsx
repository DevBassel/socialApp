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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { lovePost } from "../../store/posts/postActions";

export default function Post({
  id,
  content,
  media,
  user,
  createdAt,
  loves,
}: PostI) {
  const navigate = useNavigate();
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const checkUserLovePost = loves.find(
    (item) => item.userId === currentUser?.id
  );

  const [love, setLove] = useState<boolean>(Boolean(checkUserLovePost));

  const currentPath = useLocation().pathname;
  const dispatch: AppDispatch = useDispatch();

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
        <Typography>{content}</Typography>
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
          color={love ? "error" : "inherit"}
          onClick={() => {
            setLove(!love);
            dispatch(lovePost(id));
          }}
        >
          <FavoriteBorder fontSize="medium" />
        </IconButton>
        <IconButton
          onClick={() =>
            currentPath !== `/posts/${id}` ? navigate(`/posts/${id}`) : false
          }
          sx={iconStyle}
          color="inherit"
        >
          <ModeCommentTwoTone />
        </IconButton>
      </Box>
    </>
  );
}
