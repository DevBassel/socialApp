import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Container,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Notification } from "../../store/notifications/notificationsSlice";
import { Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface NProps {
  openNotifications: boolean;
  handleCloseNotifications(): void;
}
export default function Notifications({
  openNotifications,
  handleCloseNotifications,
}: NProps) {
  const { notifications } = useSelector(
    (state: RootState) => state.notifications
  );
  const navigate = useNavigate();

  const isMobile = useMediaQuery("(max-width: 700px)");

  return (
    <div>
      <Backdrop
        sx={{
          color: "#fff",
          backdropFilter: "blur(6px)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={openNotifications}
      >
        <Stack position={"relative"}>
          <CloseIcon
            onClick={handleCloseNotifications}
            color="error"
            sx={{
              position: "fixed",
              cursor: "pointer",
              top: 10,
              right: 10,
              fontSize: 50,
            }}
          />
          <Typography variant="h3" marginBottom={3}>
            Notifications
          </Typography>
          <Container
            maxWidth={"md"}
            sx={{
              height: isMobile ? "80vh" : "70vh",
              width: isMobile ? "95vw" : "70vw",
              borderRadius: "1rem",
              overflowY: "scroll",
            }}
          >
            {notifications.map((item: Notification) => (
              <Box
                key={item.id}
                bgcolor={"#124"}
                borderRadius={2}
                padding={2}
                display={"flex"}
                alignItems={"center"}
                marginBlock={1}
              >
                <Tooltip
                  title={
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      alignItems={"center"}
                    >
                      <Avatar src={item.from.picture} />
                      <Typography>{item.from.name}</Typography>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ fontSize: "10px" }}
                        color="primary"
                        onClick={() => {
                          handleCloseNotifications();
                          navigate(`profile/${item.from.id}`);
                        }}
                      >
                        View
                      </Button>
                    </Box>
                  }
                >
                  <Avatar src={item.from.picture} />
                </Tooltip>
                <Typography
                  variant="subtitle2"
                  flexGrow={1}
                  textAlign={"left"}
                  marginLeft={2}
                >
                  {item.content}
                </Typography>
                <Tooltip title={"make seen"} sx={{ cursor: "pointer" }}>
                  <Visibility />
                </Tooltip>
              </Box>
            ))}
          </Container>
        </Stack>
      </Backdrop>
    </div>
  );
}
