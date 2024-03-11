import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function ViewPost() {
  const { postId } = useParams();
  // const { comment } = useSelector((state: RootState) => state.comment);
  const [textValue, setTextValue] = useState("");

  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (postId && textValue.trim()) {
      setTextValue("");
    }
  };

  const getTextValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
  };
  return (
    <Container maxWidth="sm">
      <Box
        marginBlock={3}
        display={"flex"}
        alignItems={"center"}
        p={1}
        justifyContent={"space-between"}
        component={"form"}
        onSubmit={handelSubmit}
        boxShadow={"0 0 0 1px rgba(99, 99, 99, 0.2)"}
        borderRadius={4}
      >
        <TextField
          sx={{
            width: "100%",
            input: { color: "gray" },
            label: { color: "gray" },
          }}
          autoFocus
          value={textValue}
          onChange={getTextValue}
          color="primary"
          label="Add Commint"
          variant="standard"
        />
        <Button type="submit" variant="contained">
          Add
        </Button>
      </Box>

      <Stack
        key={335435346546546}
        display={"flex"}
        flexDirection={"column-reverse"}
        mt={3}
        borderRadius={3}
      ></Stack>
    </Container>
  );
}
