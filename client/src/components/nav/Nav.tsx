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
  const { user } = useSelector((state: RootState) => state.auth);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    user && (
      <AppBar
        position="sticky"
        sx={{ boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", top: 0 }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <QuestionAnswer />
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <NavItems />
            <Tooltip title="Account settings">
              <IconButton onClick={handleClick} size="small">
                <Avatar src={user.picture} />
              </IconButton>
            </Tooltip>
          </Box>
          <NavMenu {...{ handleClose, open, anchorEl }} />
        </Toolbar>
      </AppBar>
    )
  );
}
