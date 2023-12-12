import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../auth/authSlice";
import { getUser } from "./userActions";

interface State {
  user: User | null;
  loading: boolean;
  erorr: unknown;
}
const initialState: State = {
  user: null,
  loading: false,
  erorr: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state: State) => {
      state.user = null;
      state.loading = false;
      state.erorr = "";
    },
    setUser: (state: State, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUser.pending, (state: State) => {
        state.loading = true;
      })
      .addCase(
        getUser.fulfilled,
        (state: State, action: PayloadAction<User>) => {
          state.loading = false;
          state.user = action.payload;
        }
      )
      .addCase(
        getUser.rejected,
        (state: State, action: PayloadAction<unknown>) => {
          state.loading = false;
          state.erorr = action.payload;
        }
      );
  },
});
export const { resetUser, setUser } = userSlice.actions;
export default userSlice.reducer;
