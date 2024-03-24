import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import ViewPost from "./components/posts/ViewPost";
import { ClientId } from "./utils/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Error404 from "./components/Error404";
import Nav from "./components/nav/Nav";
import AddPostModel from "./components/posts/addPostModel";
import Loading from "./components/common/loading";
import Favorit from "./pages/Favorit";

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
          <Route path="/favorites" element={<Favorit />} />

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
