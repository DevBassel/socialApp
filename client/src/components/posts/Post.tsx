import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { Post as PostI } from "../../store/posts/postSlice";
import { useNavigate } from "react-router-dom";
import React from "react";
import {
  DeleteRounded,
  EditRounded,
  MenuSharp,
  SaveAsRounded,
  ShareRounded,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function Post({ content, media, user, createdAt }: PostI) {
  const navigate = useNavigate();
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box display={"flex"}>
        <Avatar src={user.picture} />
        <Box ml={2} mb={3} flexGrow={1}>
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
    </>
  );
}
