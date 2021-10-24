import "./App.css";
import { useState } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavigationBar from "navigation_bar/NavigationBar";
import SignInPage from "./sign_in_page/SignInPage";
import ResumeBuilder from "./resume_builder/ResumeBuilder";

function App() {
	const [authToken, setAuthToken] = useState(sessionStorage.getItem('auth_token'));
  	return (
		<>
			<NavigationBar />
			<BrowserRouter>
				<Switch>
					<Route path="/resume">
						<ResumeBuilder authToken={authToken} />
					</Route>
					<Route path="/login">
						<SignInPage setAuthToken={setAuthToken} />
					</Route>
				</Switch>
			</BrowserRouter>
		</>
  	)
}

export default App