import {
  Box,
  Button,
  Divider,
  Skeleton,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Post from "./Post";
import axios from "axios";
import { API } from "../../utils/api";
import { AxiosConfig } from "../../utils/axiosConfig";
import {
  Comment as CommentI,
  Post as PostI,
} from "../../store/posts/post-interfaces";
import Comment from "./Comment";
import { handleAxiosError } from "../../utils/handelError";
import useGetPostComments from "../../hooks/useGetPostComments";
import Loading from "../common/loading";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function ViewPost() {
  const { postId } = useParams();
  const [textValue, setTextValue] = useState("");
  const [post, setPost] = useState<PostI>();
  const [comments, setComment] = useState<CommentI[]>([]);
  const [more, setMore] = useState(false);
  const { isDone, isLoading, totalComments } = useGetPostComments({
    more,
    setMore,
    postId: Number(postId),
  });
  const { userData } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (!userData)
      navigate("/login");
    
    (async () => {
        try {
          const { data } = await axios.get(
            `${API}/posts/${postId}`,
            AxiosConfig
          );
          if (data) setPost(data);
        } catch (error) {
          console.log(error);
        }
      })();
  }, [navigate, postId, userData]);

  return (
    <div className="container mx-auto p-3 block lg:flex overflow-scroll basis-auto justify-between lg:h-[calc(100vh_-_65px)]   relative">
      <Stack className="flex md:sticky h-fit top-0 grow-[0.9] overflow-scroll flex-col rounded-md sh">
        {post ? (
          <Post {...post} />
        ) : (
          <Box className=" grow">
            <Box className="flex items-center">
              <Skeleton variant="circular" className="h-16 w-16 my-4 mr-4" />
              <Skeleton variant="text" className="w-full h-14" />
            </Box>
            <Skeleton variant="rectangular" className="h-full" />
          </Box>
        )}
      </Stack>

      <Box className="rounded-lg sh overflow-scroll lg:w-1/2 relative  h-full">
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
            className="mx-auto block my-4 w-3/4"
            variant="contained"
          >
            Add
          </Button>
          <Divider className="capitalize">comments</Divider>
        </Stack>

        <Stack p={1}>
          {totalComments &&
            [...comments, ...totalComments].map((comment) => (
              <Box className="sh p-2 rounded-xl my-2" key={comment.id}>
                <Comment {...comment} />
              </Box>
            ))}
          {isLoading && <Loading className="w-60 h-60  mx-auto " />}
          {!isDone && (
            <Button
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
