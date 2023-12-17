import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../store/posts/postActions";
import Post from "./Post";
import { Post as PostI, resetPosts } from "../../store/posts/postSlice";
import Comment from "./Comment";
import {
  CommentProp,
  createComment,
} from "../../store/comments/commentsActions";
import { resetComment } from "../../store/comments/commentsSlice";

export default function ViewPost() {
  const { postId } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { posts } = useSelector((state: RootState) => state.posts);
  const { comment } = useSelector((state: RootState) => state.comment);
  const [textValue, setTextValue] = useState("");

  useEffect(() => {
    if (postId) {
      dispatch(getPost(+postId));
    }

    return () => {
      dispatch(resetComment());
      dispatch(resetPosts());
    };
  }, [dispatch, postId]);

  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (postId && textValue.trim()) {
      const commentData: CommentProp = {
        postId: +postId,
        content: textValue,
      };
      setTextValue("");
      dispatch(createComment(commentData));
    }
  };

  const getTextValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
  };
  return (
    <Container maxWidth="sm">
      {posts &&
        posts.map((post: PostI) => (
          <Stack
            key={post.id}
            mt={3}
            borderRadius={3}
            boxShadow={"0 0 0 1px rgba(99, 99, 99, 0.2)"}
          >
            <Post {...post} />
          </Stack>
        ))}
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
      {posts && posts[0] && posts[0].comments && posts[0]?.comments[0] && (
        <Typography variant="h6">Comments</Typography>
      )}

      <Stack
        key={335435346546546}
        display={"flex"}
        flexDirection={"column-reverse"}
        mt={3}
        borderRadius={3}
      >
        {posts &&
          posts[0] &&
          posts[0].comments &&
          [...posts[0].comments, ...comment].map((comment) => (
            <Box
              key={comment.id}
              boxShadow={"0 0 0 1px rgba(99, 99, 99, 0.2)"}
              marginBlock={1}
              bgcolor={"#101418"}
              borderRadius={3}
              p={2}
            >
              <Comment {...comment} />
            </Box>
          ))}
      </Stack>
    </Container>
  );
}
