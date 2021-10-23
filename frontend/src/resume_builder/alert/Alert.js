export default function Alert({ content }) {
    return (
        <>
            { content &&
                <div className="alert alert-primary d-print-none" role="alert">
                    {content}
                </div>
            }
        </>
    )
}