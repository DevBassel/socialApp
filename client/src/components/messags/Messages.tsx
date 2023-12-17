import { Container, Stack, Tooltip, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Chat } from "./Chat";
import BackdropComponent from "../common/BackdropComponent";

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
    <BackdropComponent
      title="Chats"
      closeFun={handleCloseMessages}
      open={openMessages}
      containerEl={
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
          {chats &&
            chats.map((chat) => (
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
      }
    />
  );
}
