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
import { Comment as CommentI } from "../../store/posts/postSlice";
import { MenuSharp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function Comment({ content, createdAt, user }: CommentI) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const cuurentUser = useSelector((state: RootState) => state.auth.user);
  return (
    <>
      <Box display={"flex"}>
        <Avatar src={user.picture} />
        <Box ml={2} mb={3} display={"flex"} flexGrow={1} alignItems={"center"}>
          <Button
            variant="text"
            sx={{ padding: 0, textTransform: "none" }}
            onClick={() => navigate(`/profile/${user.id}`)}
          >
            {user.name}
          </Button>
          <Typography ml={3} variant="subtitle2" color={"gray"}>
            {createdAt.split("T")[0]}
          </Typography>
        </Box>

        {cuurentUser?.id === user.id ? (
          <>
            <Tooltip title="Options">
              <IconButton
                onClick={handleClick}
                sx={{ margin: "10px 0", padding: 1, height: 0 }}
              >
                <MenuSharp color="info" />
              </IconButton>
            </Tooltip>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem>Edit</MenuItem>
              <MenuItem>Remove</MenuItem>
            </Menu>
          </>
        ) : null}
      </Box>
      <Box ml={6}>
        <Typography variant="subtitle2" color={"gray"}>
          {content}
        </Typography>
      </Box>
    </>
  );
}
