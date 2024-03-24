import {
  Box,
  Button,
  Divider,
  Skeleton,
  Stack,
  TextField,
} from "@mui/material";
import { useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Post from "../components/posts/Post";
import axios from "axios";
import { API } from "../utils/api";
import { AxiosConfig } from "../utils/axiosConfig";
import { Comment as CommentI } from "../store/posts/post-interfaces";
import Comment from "../components/posts/Comment";
import { handleAxiosError } from "../utils/handelError";
import useGetPostComments from "../hooks/useGetPostComments";
import Loading from "../components/common/loading";

export default function ViewPost() {
  const { postId } = useParams();
  const [textValue, setTextValue] = useState("");
  const [comments, setComment] = useState<CommentI[]>([]);
  const [more, setMore] = useState(false);

  const loadMoreRef = useRef(null);
  const { isDone, isLoading, totalComments, error, post } = useGetPostComments({
    more,
    setMore,
    postId: Number(postId),
  });

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (postId && textValue.trim()) {
      try {
        const { data } = await axios.post(
          `${API}/comments`,
          {
            postId: +postId,
            content: textValue,
          },
          AxiosConfig
        );
        if (data) {
          setComment([...comments, data]);
        }
      } catch (error) {
        console.log(handleAxiosError(error));
      }
      setTextValue("");
    }
  };

  const getTextValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
  };

  if (error === 404) {
    return <Navigate to={"/post-not-found"} />;
  }

  return (
    <div className="container mx-auto p-3 block lg:flex overflow-scroll basis-auto justify-between lg:h-[calc(100vh_-_65px)]   relative">
      <Stack className="flex md:sticky h-fit top-0 grow-[0.9] overflow-scroll flex-col rounded-md sh">
        {post ? (
          <Post {...post} />
        ) : (
          <Box className="grow">
            <Box className="flex items-center">
              <Skeleton variant="circular" className="h-16 w-16 my-4 mr-4" />
              <Skeleton variant="text" className="w-full h-14" />
            </Box>
            <Skeleton variant="rectangular" className="h-full" />
          </Box>
        )}
      </Stack>

      <Box className="rounded-lg md:sticky md:top-0 mx-2 mt-2 md:mt-0 sh overflow-scroll lg:w-1/2   h-full">
        <Stack
          className="md:sticky top-0 p-2 bg-main z-20"
          component={"form"}
          onSubmit={handelSubmit}
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
          <Button
            size="small"
            type="submit"
            disabled={Boolean(!textValue)}
            className="mx-auto block my-4 w-3/4"
            variant="contained"
          >
            Add
          </Button>
          <Divider className="capitalize">comments</Divider>
        </Stack>

        <Stack p={1}>
          {totalComments &&
            [...comments, ...totalComments].map((comment, index) => (
              <Box key={`comment_${comment.id}_${index}`}>
                <Comment {...comment} />
              </Box>
            ))}
          {isLoading && <Loading className="w-60 h-60  mx-auto " />}
          {!isDone && (
            <Button
              ref={loadMoreRef}
              onClick={() => {
                setMore(true);
              }}
              variant="contained"
              color="success"
              className="w-3/4 mx-auto block font-extrabold text-gray-800"
            >
              More Comments
            </Button>
          )}
        </Stack>
      </Box>
    </div>
  );
}
