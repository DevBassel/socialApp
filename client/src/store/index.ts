import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import notificationsSlice from "./notifications/notificationsSlice";
import chatSlice from "./chats/chatSlice";
import userSlice from "./user/userSlice";
import postSlice from "./posts/postSlice";
import friendSlice from "./friend/friendSlice";
import commentsSlice from "./comments/commentsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    notifications: notificationsSlice,
    chats: chatSlice,
    user: userSlice,
    posts: postSlice,
    friends: friendSlice,
    comment: commentsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
