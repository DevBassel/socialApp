import { User } from "../user/userSlice";

export interface Comment {
  id?: 4;
  content: string;
  media?: null;
  createdAt: string;
  updatedAt?: string;
  user: User;
}
export interface Love {
  id: number;
  userId: number;
  postId: number;
  createdAt: string;
}
export interface Post {
  id: number;
  content: string;
  media: string | null;
  user: User;
  createdAt: string;
  updatedAt?: string;
  commentCount: number;
  loveCount: number;
  userLovePost: boolean;
}

export interface State {
  posts: Post[];
  loading: boolean;
  error: unknown;
}
