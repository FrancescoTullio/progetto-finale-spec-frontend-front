
export default function LoadingSpinner() {
  return (
    <div className="text-center py-5">
      <div className="spinner-grow text-warning" role="status" style={{ width: "3rem", height: "3rem" }}>
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="mt-4">
        <h4 className="text-warning">Caricamento in corso</h4>
        <p className="text-light opacity-75">Prepara i controller, stiamo caricando i tuoi giochi...</p>
      </div>
    </div>
  );
}