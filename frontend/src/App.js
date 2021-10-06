import "./App.css";
import ResumeBuilder from "./resume_builder/ResumeBuilder";

function App() {
  return (
		<>
			<div className="container">
				<div className="btn-group d-print-none">
					<button type="button" className="btn btn-success">Save</button>
					<button type="button" className="btn btn-primary">Load</button>
					<button type="button" className="btn btn-warning">Blank</button>
					<button type="button" className="btn btn-danger">Delete</button>
				</div>
			</div>
			<div>
				<ResumeBuilder />
			</div>
		</>
  )
}

export default App