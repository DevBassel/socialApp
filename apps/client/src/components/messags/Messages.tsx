import { Container, useMediaQuery } from "@mui/material";
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
        ></Container>
      }
    />
  );
}
