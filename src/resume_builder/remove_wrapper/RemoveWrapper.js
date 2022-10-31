export default function RemoveWrapper(props) {
  return (
    <div className="subsection-wrapper">
      {props.children}
      <div className="remove-icon-wrapper">
        <i className="bi bi-x-lg" onClick={props.handleRemove} />
      </div>
    </div>
  );
}
