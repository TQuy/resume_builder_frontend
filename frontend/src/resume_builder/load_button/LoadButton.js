import { useEffect } from "react/cjs/react.development";

export default function LoadButton() {
    useEffect(() => {
        const list_of_resumes = async () => {
            try {
                let response = await fetch('/list_resume');
                response = await response.json();
                return response['content'];
            } catch(err) {
                console.error(err);
            }
        };
    })

    const resume_list = list_of_resumes.map((i) => {
        return <SavedResume key={i['name']} id={i['id']} name={i['name']} onClick={this.handleLoad} />;
    });

    return (
        <div className="dropdown">
            <button className="btn btn-info dropdown-toggle" type="button" id="load_btn" data-bs-toggle="dropdown" aria-expanded="false">
                Load
            </button>
            <ul className="dropdown-menu" aria-labelledby="load_btn">
                {resume_list}
            </ul>
        </div>
    )
}