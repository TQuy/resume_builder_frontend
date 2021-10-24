import "./App.css";
import { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import NavigationBar from "navigation_bar/NavigationBar";
import SignInPage from "./sign_in_page/SignInPage";
import ResumeBuilder from "./resume_builder/ResumeBuilder";

function App() {
	const [authToken, setAuthToken] = useState(sessionStorage.getItem('auth_token'));
  	return (
		<>
			<BrowserRouter>
				<NavigationBar />
				<Switch>
					<Route path="/resume/">
						{authToken ? <ResumeBuilder authToken={authToken} /> : <Redirect to="/login/" /> }
					</Route>
					<Route path="/login/">
						<SignInPage setAuthToken={setAuthToken} />
					</Route>
				</Switch>
			</BrowserRouter>
		</>
  	)
}

export default App