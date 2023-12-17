import {
  HomeRounded,
  MessageRounded,
  NotificationsActiveRounded,
  PeopleAlt,
} from "@mui/icons-material";
import { Badge, IconButton, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { getNotifications } from "../../store/notifications/notificationsActions";
import { useNavigate } from "react-router-dom";
import Notifications from "../notifications/Notifications";
import React from "react";
import { resetNotifications } from "../../store/notifications/notificationsSlice";
import Messages from "../messags/Messages";
import { getChats } from "../../store/chats/chatActions";
import { getFriends } from "../../store/friend/friendActions";
import Friends from "../friends/Friends";
import { resetChat } from "../../store/chats/chatSlice";
import { resetFriends } from "../../store/friend/friendSlice";

export default function NavItems() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [openNotifications, setOpenNotifications] = React.useState(false);
  const [openMessages, setOpenMessages] = React.useState(false);
  const [openFriends, setOpenFriends] = React.useState(false);

  const handleCloseMessages = () => {
    dispatch(resetChat());
    setOpenMessages(false);
  };

  const handleCloseFriends = () => {
    dispatch(resetFriends());
    setOpenFriends(false);
  };

  const handleCloseNotifications = () => {
    dispatch(resetNotifications());
    setOpenNotifications(false);
  };

  const iconColor = "white";
  const navItems = [
    {
      title: "Home",
      color: "error",
      icone: <HomeRounded sx={{ color: iconColor }} />,
      handel: () => navigate("/"),
      count: 0,
    },
    {
      title: "Feriends",
      color: "error",
      icone: <PeopleAlt sx={{ color: iconColor }} />,
      handel: () => {
        dispatch(getFriends());
        setOpenFriends(true);
      },
      count: 0,
    },
    {
      title: "Messages",
      color: "error",
      icone: <MessageRounded sx={{ color: iconColor }} />,
      handel: () => {
        dispatch(getChats());
        setOpenMessages(true);
      },
      count: 0,
    },
    {
      title: "Notifications",
      color: "error",
      icone: <NotificationsActiveRounded sx={{ color: iconColor }} />,
      link: "/notifications",
      handel: () => {
        dispatch(getNotifications());
        setOpenNotifications(true);
      },
      count: 0,
    },
  ];
  return (
    <>
      {navItems.map((item) => (
        <Tooltip key={item.title} title={item.title} sx={{ mr: 1.6 }}>
          <Badge badgeContent={item.count} max={9} color="error">
            <IconButton onClick={item?.handel}>{item.icone}</IconButton>
          </Badge>
        </Tooltip>
      ))}
      <Notifications {...{ openNotifications, handleCloseNotifications }} />
      <Messages {...{ openMessages, handleCloseMessages }} />
      <Friends {...{ openFriends, handleCloseFriends }} />
    </>
  );
}
