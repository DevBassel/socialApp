import {
  HomeRounded,
  MessageRounded,
  NotificationsActiveRounded,
} from "@mui/icons-material";
import { Badge, IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Notifications from "../notifications/Notifications";
import React from "react";
import Messages from "../messags/Messages";

export default function NavItems() {
  const navigate = useNavigate();
  const [openNotifications, setOpenNotifications] = React.useState(false);
  const [openMessages, setOpenMessages] = React.useState(false);

  const handleCloseMessages = () => {
    setOpenMessages(false);
  };

  const handleCloseNotifications = () => {
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
      title: "Messages",
      color: "error",
      icone: <MessageRounded sx={{ color: iconColor }} />,
      handel: () => {
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
    </>
  );
}
