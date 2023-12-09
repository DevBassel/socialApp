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

export default function NavItems() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [openNotifications, setOpenNotifications] = React.useState(false);

  const handleCloseNotifications = () => {
    setOpenNotifications(false);
  };

  const iconColor = "white";
  const navItems = [
    {
      title: "Feeds",
      color: "error",
      icone: <HomeRounded sx={{ color: iconColor }} />,
      handel: () => navigate("/"),
      count: 0,
    },
    {
      title: "Feriends",
      color: "error",
      icone: <PeopleAlt sx={{ color: iconColor }} />,
      handel: () => navigate("/freiends"),
      count: 10,
    },
    {
      title: "Messages",
      color: "error",
      icone: <MessageRounded sx={{ color: iconColor }} />,
      handel: () => navigate("/messages"),
      count: 10,
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
      count: 2,
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
    </>
  );
}
