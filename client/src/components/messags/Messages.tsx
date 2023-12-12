import {
  Backdrop,
  Container,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Chat } from "./Chat";

interface MProps {
  openMessages: boolean;
  handleCloseMessages(): void;
}
export default function Messages({
  openMessages,
  handleCloseMessages,
}: MProps) {
  const isMobile = useMediaQuery("(max-width: 700px)");
  const { chats } = useSelector((state: RootState) => state.chats);

  return (
    <div>
      <Backdrop
        sx={{
          color: "#fff",
          backdropFilter: "blur(6px)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={openMessages}
      >
        <Stack position={"relative"}>
          <CloseIcon
            onClick={handleCloseMessages}
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
            Chats
          </Typography>
          <Container
            maxWidth={"md"}
            sx={{
              height: isMobile ? "80vh" : "70vh",
              width: isMobile ? "95vw" : "70vw",
              borderRadius: "1rem",
              overflowY: "scroll",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
              flexWrap: "wrap",
            }}
          >
            {chats.map((chat) => (
              <Tooltip key={chat.id} title={chat.createdAt}>
                <Stack
                  key={chat.id}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  sx={{ width: "fit-content", cursor: "pointer" }}
                >
                  <Chat {...chat} />
                </Stack>
              </Tooltip>
            ))}
          </Container>
        </Stack>
      </Backdrop>
    </div>
  );
}
