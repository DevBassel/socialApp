import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getNotifications } from "./notificationsActions";
import { User } from "../auth/authSlice";

interface Notification {
  id: number;
  content: string;
  from: User;
  toId: number;
  createdAt: string;
}
interface State {
  notifications: Notification[];
  loading: boolean;
  error: unknown;
}

const initialState: State = {
  notifications: [],
  loading: false,
  error: "",
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getNotifications.pending, (state: State) => {
        state.loading = true;
      })
      .addCase(
        getNotifications.fulfilled,
        (state: State, action: PayloadAction<Notification[]>) => {
          state.loading = false;
          state.notifications = action.payload;
          state.error = "";
        }
      )
      .addCase(
        getNotifications.rejected,
        (state: State, action: PayloadAction<unknown>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default notificationsSlice.reducer;
