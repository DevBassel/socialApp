import { Container, useMediaQuery } from "@mui/material";
import BackdropComponent from "../common/BackdropComponent";

interface NProps {
  openNotifications: boolean;
  handleCloseNotifications(): void;
}
export default function Notifications({
  openNotifications,
  handleCloseNotifications,
}: NProps) {
  const isMobile = useMediaQuery("(max-width: 700px)");

  return (
    <BackdropComponent
      title="Notifications"
      closeFun={handleCloseNotifications}
      open={openNotifications}
      containerEl={
        <Container
          maxWidth={"md"}
          sx={{
            height: isMobile ? "80vh" : "70vh",
            width: isMobile ? "95vw" : "70vw",
            borderRadius: "1rem",
            overflowY: "scroll",
          }}
        ></Container>
      }
    />
  );
}
