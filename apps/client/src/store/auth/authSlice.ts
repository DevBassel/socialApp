import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LoginGoogle, LogoutAction } from "./authActions";

export interface Auth {
  access_token: string;
}

interface State {
  userData: Auth | null;
  error: unknown;
  loading: boolean;
}

const auth: Auth = localStorage.getItem("user_data")
  ? JSON.parse(String(localStorage.getItem("user_data")))
  : null;

const initialState: State = {
  userData: auth,
  error: "",
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state: State) => {
      state.error = "";
      state.userData = null;
      state.loading = false;
      LogoutAction();
    },
  },
  extraReducers(builder) {
    builder
      .addCase(LoginGoogle.pending, (state) => {
        state.loading = true;
      })
      .addCase(LoginGoogle.fulfilled, (state, action: PayloadAction<Auth>) => {
        state.loading = false;
        state.userData = action.payload;
        state.error = "";
      })
      .addCase(
        LoginGoogle.rejected,
        (state, action: PayloadAction<unknown>) => {
          console.log(action);
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
