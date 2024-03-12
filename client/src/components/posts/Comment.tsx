import {
  Avatar,
  Box,
  Button,
  IconButton,
  Input,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { Comment as CommentI } from "../../store/posts/post-interfaces";
import { MenuSharp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

interface CommentProp extends CommentI {}

export default function Comment({ content, createdAt, user }: CommentProp) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [disableEdit, setDisableEdit] = useState(true);
  const [commentContent, setCommentContent] = useState(content);

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
            <MenuItem
              onClick={() => {
                setDisableEdit(false);
                handleClose();
              }}
            >
              Edit
            </MenuItem>
            <MenuItem>Remove</MenuItem>
          </Menu>
        </>
      </Box>
      <Box ml={6}>
        <Input
          onChange={(e) => {
            setCommentContent(e.target.value);
          }}
          value={commentContent}
          disableUnderline={disableEdit}
          disabled={disableEdit}
        />
        {!disableEdit && (
          <>
            <Button sx={{ ml: 2 }} variant="outlined">
              Edite
            </Button>
            <Button
              onClick={() => setDisableEdit(true)}
              sx={{ ml: 2 }}
              variant="outlined"
              color="error"
            >
              Cancel
            </Button>
          </>
        )}
      </Box>
    </>
  );
}
