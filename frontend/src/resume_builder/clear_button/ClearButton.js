export default function ClearButton({ dispatch, setCurrentResume }) {
    // console.log('ClearButton');
    const handleClear = () => {
        dispatch({ "name": "blank" });
        setCurrentResume({ 'name': '', 'id': 0 });
    };
    return (
        <button type="button" className="btn btn-warning" onClick={() => handleClear()}>Blank</button>
    )
}