import { MenuSharp } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { User } from "../../store/auth/authSlice";

export default function Friends({ friend }: { friend: User }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Stack
      display={"flex"}
      direction={"row"}
      alignItems={"center"}
      mt={3}
      borderRadius={2}
      boxShadow={"0 0 0 1px rgba(99, 99, 99, 0.2)"}
    >
      <Box mr={2}>
        <Badge color="success" variant="dot" invisible={false}>
          <Avatar variant="rounded" src={friend.picture} />
        </Badge>
      </Box>
      <Typography flexGrow={1} variant="subtitle1">
        {friend.name}
      </Typography>
      <Box>
        <Tooltip title="Options">
          <IconButton
            onClick={handleClick}
            sx={{ margin: "10px 0", padding: 1, height: 0 }}
          >
            <MenuSharp color="info" />
          </IconButton>
        </Tooltip>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem>Message</MenuItem>
          <MenuItem>Block</MenuItem>
          <MenuItem>Remove</MenuItem>
        </Menu>
      </Box>
    </Stack>
  );
}
