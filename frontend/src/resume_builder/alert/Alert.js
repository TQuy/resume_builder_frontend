export default function Alert({ content }) {
    return (
        <>
            { content &&
                <div className="alert alert-primary" role="alert">
                    {content}
                </div>
            }
        </>
    )
}