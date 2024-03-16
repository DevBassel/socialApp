import { Backdrop, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface BackdropComponentProps {
  open: boolean;
  closeFun(): void;
  containerEl: JSX.Element;
  title: string;
}
export default function BackdropComponent({
  closeFun,
  open,
  containerEl,
  title,
}: BackdropComponentProps) {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        backdropFilter: "blur(8px)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={open}
    >
      <Stack position={"relative"}>
        <CloseIcon
          onClick={closeFun}
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
          {title}
        </Typography>
        {containerEl}
      </Stack>
    </Backdrop>
  );
}
