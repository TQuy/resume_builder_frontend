export default function ClearButton({ dispatch }) {
    console.log('ClearButton');
    return (
        <button type="button" className="btn btn-warning" onClick={() => dispatch({ "name": "blank" })}>Blank</button>
    )
}