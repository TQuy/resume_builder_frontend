export default function ClearButton({ dispatch }) {
    return (
        <button type="button" className="btn btn-warning" onClick={() => dispatch({ "name": "blank" })}>Blank</button>
    )
}