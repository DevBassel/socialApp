import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import ViewPost from "./components/posts/ViewPost";
import { ClientId } from "./utils/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Error404 from "./components/Error404";
import Nav from "./components/nav/Nav";
import AddPostModel from "./components/posts/addPostModel";
import Loading from "./components/common/loading";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box position={"relative"}>
        <Nav />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:userId" element={<Profile />} />

          <Route
            path="/login"
            element={
              <GoogleOAuthProvider clientId={ClientId}>
                <Login />
              </GoogleOAuthProvider>
            }
          />
          <Route
            path="/add-post"
            loader={() => <Loading />}
            element={<AddPostModel />}
          />
          <Route
            path="/posts/:postId"
            loader={() => <Loading />}
            element={<ViewPost />}
          />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
