import { Logout, Person, Settings } from "@mui/icons-material";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import { logout } from "../../store/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import { googleLogout } from "@react-oauth/google";

interface Item {
  name: string;
  handel(): void;
  icon: JSX.Element;
}
interface MenueProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose(): void;
}
export default function NavMenu({ anchorEl, open, handleClose }: MenueProps) {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Profile",
      icon: <Person />,
      handel: () => {
        handleClose();
        navigate("/profile");
        console.log("profile");
      },
    },
    {
      name: "Settings",
      icon: <Settings />,
      handel: () => {
        handleClose();
        console.log("Settings");
      },
    },
    {
      name: "Logout",
      icon: <Logout />,
      handel: () => {
        handleClose();
        googleLogout();
        dispatch(logout());
        navigate("/");
      },
    },
  ];

  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {menuItems.map((item: Item) => (
        <MenuItem key={item.name} onClick={item.handel}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          {item.name}
        </MenuItem>
      ))}
    </Menu>
  );
}
