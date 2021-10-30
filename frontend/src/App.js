import "./App.css";
import { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import NavigationBar from "navigation_bar/NavigationBar";
import LoginPage from "./login_page/LoginPage";
import RegisterPage from "register_page/RegisterPage";
import ResumeBuilder from "./resume_builder/ResumeBuilder";

function App() {
	const [authToken, setAuthToken] = useState(sessionStorage.getItem('auth_token'));
  	return (
		<>
			<BrowserRouter>
				<NavigationBar authToken={authToken} setAuthToken={setAuthToken} />
				<Switch>
					<Route path="/resume/">
						{authToken ? <ResumeBuilder authToken={authToken} /> : <Redirect to="/login/" /> }
					</Route>
					<Route path="/login/">
						<LoginPage setAuthToken={setAuthToken} />
					</Route>
					<Route path="/register/">
						<RegisterPage setAuthToken={setAuthToken} />
					</Route>
				</Switch>
			</BrowserRouter>
		</>
  	)
}

export default App