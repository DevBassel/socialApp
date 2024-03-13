import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Comment } from "../store/posts/post-interfaces";
import { handleAxiosError } from "../utils/handelError";
import { API } from "../utils/api";
import { AxiosConfig } from "../utils/axiosConfig";

export default function useGetPostComments({
  more,
  setMore,
  postId,
}: {
  more: boolean;
  postId: number;
  setMore(val: boolean): void;
}) {
  const { userData } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState("");
  const [totalComments, setTotalComments] = useState<Comment[]>([]);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    if (more) {
      setPageNum((prevPageNum) => prevPageNum + 1);
      setMore(false);
    }
  }, [more, setMore]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `${API}/comments?postId=${postId}&page=${pageNum}`,
          AxiosConfig
        );

        if (data.length > 0) {
          setTotalComments((prevTotalPosts) => [...prevTotalPosts, ...data]);
        } else {
          setIsDone(true);
        }
      } catch (error) {
        setError(handleAxiosError(error));
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userData?.access_token) {
      fetchData();
    }
  }, [pageNum, postId, userData?.access_token]);

  return { isLoading, error, totalComments, isDone };
}
