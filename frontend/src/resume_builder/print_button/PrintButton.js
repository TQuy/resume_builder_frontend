export default function PrintButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      id="print_btn"
      className="btn btn-secondary d-print-none"
      onClick={() => handlePrint()}
    >
      Print
    </button>
  );
}
