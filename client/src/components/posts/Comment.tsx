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
import { Comment as CommentI } from "../../store/posts/postSlice";
import { MenuSharp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  removeComment,
  updateComment,
} from "../../store/comments/commentsActions";
import Swal from "sweetalert2";
import { resetComment } from "../../store/comments/commentsSlice";

interface CommentProp extends CommentI {}

export default function Comment({ content, id, createdAt, user }: CommentProp) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [disableEdit, setDisableEdit] = useState(true);
  const [commentContent, setCommentContent] = useState(content);

  const { msg, error } = useSelector((state: RootState) => state.comment);
  const dispatch: AppDispatch = useDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const cuurentUser = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (msg) {
      Swal.fire({
        title: msg,
        icon: "success",
      }).then(() => dispatch(resetComment()));
    }
    if (error) {
      Swal.fire({
        title: error,
        icon: "error",
      }).then(() => dispatch(resetComment()));
    }
  }, [dispatch, error, msg]);
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
              <MenuItem
                onClick={() => {
                  setDisableEdit(false);
                  handleClose();
                }}
              >
                Edit
              </MenuItem>
              <MenuItem
                onClick={() => {
                  id && dispatch(removeComment(+id));
                  handleClose();
                }}
              >
                Remove
              </MenuItem>
            </Menu>
          </>
        ) : null}
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
            <Button
              onClick={() => {
                setDisableEdit(true);
                id &&
                  commentContent &&
                  dispatch(updateComment({ content: commentContent, id }));
              }}
              sx={{ ml: 2 }}
              variant="outlined"
            >
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
