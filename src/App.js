import "./App.css";
import { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import NavigationBar from "navigation_bar/NavigationBar";
import LoginPage from "login_page/LoginPage";
import RegisterPage from "register_page/RegisterPage";
import ResumeBuilder from "resume_builder/ResumeBuilder";
import Alert from "alert/Alert";
import { useAlert } from "custom_hook";
import { alertContext } from "context";

function App() {
  const [authToken, setAuthToken] = useState(
    sessionStorage.getItem("auth_token")
  );
  const [alertContent, setAlertContent] = useAlert("");

  return (
    <>
      <alertContext.Provider value={setAlertContent}>
        <BrowserRouter>
          <NavigationBar authToken={authToken} setAuthToken={setAuthToken} />
          <Alert content={alertContent} />
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
      </alertContext.Provider>
    </>
  );
}

export default App;
