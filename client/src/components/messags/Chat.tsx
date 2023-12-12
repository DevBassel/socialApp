import { Avatar, Box, BoxProps, Typography } from "@mui/material";
import { Chat as ChatI } from "../../store/chats/chatSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export function Chat({ sender, reciever }: ChatI) {
  const { user } = useSelector((state: RootState) => state.auth);
  const dotStyle: BoxProps = {
    position: "absolute",
    bottom: 0,
    right: 0,
    bgcolor: "lime",
    height: "10px",
    width: "10px",
    borderRadius: "50%",
  };
  const friend = sender.id === user?.id ? reciever : sender;
  return (
    <>
      <Box position={"relative"}>
        <Avatar src={friend.picture} sx={{ width: 70, height: 70 }} />
        <Box {...dotStyle}></Box>
      </Box>
      <Typography variant="subtitle1" mt={1}>
        {friend.name}
      </Typography>
    </>
  );
}
