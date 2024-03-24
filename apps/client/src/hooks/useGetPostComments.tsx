import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Comment, Post } from "../store/posts/post-interfaces";
import { API } from "../utils/api";
import { AxiosConfig } from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";

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
  const [error, setError] = useState<number>();
  const [totalComments, setTotalComments] = useState<Comment[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [post, setPost] = useState<Post>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) navigate("/login");

    (async () => {
      try {
        const { data } = await axios.get(`${API}/posts/${postId}`, AxiosConfig);
        if (data) setPost(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            setError(404);
          }
        }
      }
    })();
  }, [navigate, postId, userData]);

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
          if (data.length < 5) setIsDone(true);
        } else {
          setIsDone(true);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.status);
        }
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userData?.access_token && post?.id) {
      fetchData();
    }
  }, [pageNum, post?.id, postId, userData?.access_token]);

  return { isLoading, error, totalComments, isDone, post };
}
