import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Nav from "./components/nav/Nav";
import { Box } from "@mui/material";
import ViewPost from "./components/posts/ViewPost";
import { ClientId } from "./utils/client";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <Box position={"relative"}>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
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
        <Route path="/posts/:postId" element={<ViewPost />} />
      </Routes>
    </Box>
  );
}

export default App;
