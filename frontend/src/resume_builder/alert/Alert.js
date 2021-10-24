import "./Alert.css";

export default function Alert({ content }) {
    return (
        <>
            { content &&
                <div id="alert" className="alert alert-primary d-print-none" role="alert">
                    {content}
                </div>
            }
        </>
    )
}