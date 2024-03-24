import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import React from "react";
import { QuestionAnswer } from "@mui/icons-material";
import NavMenu from "./NavMenu";
import NavItems from "./NavItems";
import { Avatar, IconButton, Tooltip } from "@mui/material";

export default function ButtonAppBar() {
  const { userData } = useSelector((state: RootState) => state.auth);
  const { user } = useSelector((state: RootState) => state.user);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    userData?.access_token && (
      <AppBar className="sticky top-0 sh bg-tre">
        <Toolbar>
          <Typography variant="h6">
            <QuestionAnswer />
          </Typography>

          <Box className="grow justify-center items-center">
            <NavItems />
          </Box>
          <Box className="flex items-center text-center">
            <Tooltip title={user?.name}>
              <IconButton
                onClick={handleClick}
                size="small"
                className="rounded-md"
              >
                <Typography
                  variant="body1"
                  className="hidden md:flex mx-0 md:mx-4 "
                >
                  {user?.name}
                </Typography>
                <Avatar src={user?.picture} />
              </IconButton>
            </Tooltip>
          </Box>
          <NavMenu {...{ handleClose, open, anchorEl }} />
        </Toolbar>
      </AppBar>
    )
  );
}
