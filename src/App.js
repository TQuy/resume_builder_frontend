import "./App.css";
import { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import NavigationBar from "navigation_bar/NavigationBar";
import LoginPage from "./login_page/LoginPage";
import RegisterPage from "register_page/RegisterPage";
import ResumeBuilder from "./resume_builder/ResumeBuilder";

function App() {
  const [authToken, setAuthToken] = useState(
    sessionStorage.getItem("auth_token")
  );

  return (
    <>
      <BrowserRouter>
        <NavigationBar authToken={authToken} setAuthToken={setAuthToken} />
        <Routes>
          <Route
            path="/login/"
            element={<LoginPage setAuthToken={setAuthToken} />}
          />
          <Route
            path="/register/"
            element={<RegisterPage setAuthToken={setAuthToken} />}
          />
          <Route
            path="/"
            element={
              authToken ? (
                <ResumeBuilder authToken={authToken} />
              ) : (
                <Navigate to="/login/" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
