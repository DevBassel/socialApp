import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { MoreVert } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Friend } from "../../store/friend/friendSlice";
import { User } from "../../store/auth/authSlice";
import BackdropComponent from "../common/BackdropComponent";

interface NProps {
  openFriends: boolean;
  handleCloseFriends(): void;
}

export default function Friends({ openFriends, handleCloseFriends }: NProps) {
  const navigate = useNavigate();
  const { friends } = useSelector((state: RootState) => state.friends);
  const { user } = useSelector((state: RootState) => state.auth);

  const isMobile = useMediaQuery("(max-width: 700px)");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getFriendProp = (friend: Friend, prop: keyof User): string => {
    return friend.sender.id === user?.id
      ? String(friend.reciver[prop])
      : String(friend.sender[prop]);
  };
  return (
    <BackdropComponent
      title="Friends"
      closeFun={handleCloseFriends}
      open={openFriends}
      containerEl={
        <Grid
          container
          sx={{
            height: isMobile ? "80vh" : "70vh",
            width: isMobile ? "95vw" : "70vw",
            borderRadius: "1rem",
            overflowY: "scroll",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          {friends.map((friend) => (
            <Grid key={friend.id} item xs={10} sm={6} md={4} padding={1}>
              <Box
                display={"flex"}
                alignItems={"center"}
                borderRadius={2}
                bgcolor={"rgba(0,0,0,.6)"}
                position={"relative"}
              >
                <Avatar
                  src={getFriendProp(friend, "picture")}
                  variant="rounded"
                  sx={{ width: 50, height: 50 }}
                />
                <Typography
                  flexGrow={1}
                  textAlign={"left"}
                  variant="subtitle1"
                  ml={2}
                >
                  {getFriendProp(friend, "name")}
                </Typography>
                <IconButton
                  onClick={handleClick}
                  sx={{ position: "absolute", right: 0 }}
                >
                  <MoreVert color="primary" />
                </IconButton>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      handleCloseFriends();
                      navigate(`/profile/${getFriendProp(friend, "id")}`);
                    }}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleClose}>Remove</MenuItem>
                  <MenuItem onClick={handleClose}>Message</MenuItem>
                </Menu>
              </Box>
            </Grid>
          ))}
        </Grid>
      }
    />
  );
}
