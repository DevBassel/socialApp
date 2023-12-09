import {
  Avatar,
  Backdrop,
  Box,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
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
  const isMobile = useMediaQuery("(max-width: 899px)");
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
              top: 30,
              right: 30,
              fontSize: 60,
            }}
          />
          <Container
            maxWidth={"md"}
            sx={{
              height: isMobile ? "80vh" : "70vh",
              width: isMobile ? "95vw" : "70vw",
              borderRadius: "1rem",
              overflowY: "scroll",
            }}
          >
            {notifications.map((item) => (
              <Box
                key={item.id}
                bgcolor={"#124"}
                borderRadius={2}
                padding={2}
                display={"flex"}
                alignItems={"center"}
                marginBlock={1}
              >
                <Avatar src={item.from.picture} />
                <Typography variant="subtitle2" marginLeft={2}>
                  {item.content}
                </Typography>
              </Box>
            ))}
          </Container>
        </Stack>
      </Backdrop>
    </div>
  );
}
