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
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import axios from "axios";
import { API } from "../../utils/api";
import { AxiosConfig } from "../../utils/axiosConfig";

interface CommentProp extends CommentI {}

export default function Comment({ content, id, createdAt, user }: CommentProp) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [disableEdit, setDisableEdit] = useState(true);
  const [commentContent, setCommentContent] = useState(content);
  const currentUser = useSelector((state: RootState) => state.user.user);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box className="flex">
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

        {user.id === currentUser?.id && (
          <>
            <Tooltip title="Options">
              <IconButton onClick={handleClick}>
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
        )}
      </Box>
      <Box className="flex justify-between ml-12">
        <Input
          className="grow  break-all "
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
              variant="outlined"
              onClick={async () => {
                try {
                  const { data } = await axios.patch(
                    `${API}/comments/${id}`,
                    {
                      content: commentContent,
                    },
                    AxiosConfig
                  );

                  if (data) setCommentContent(data.content);
                  setDisableEdit(true);
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              Edite
            </Button>
            <Button
              onClick={() => {
                setCommentContent(content);
                setDisableEdit(true);
              }}
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
