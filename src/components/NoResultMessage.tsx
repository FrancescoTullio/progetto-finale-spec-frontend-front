type NoResultsMessageProps = {
  searchTerm?: string;
  selectedCategory?: string;
};

export default function NoResultsMessage({ searchTerm, selectedCategory }: NoResultsMessageProps) {
  return (
    <div className="text-center py-5">
      <i className="bi bi-search display-1 text-warning mb-3"></i>
      <h3 className="text-warning">Nessun risultato trovato</h3>
      
      <p className="text-light opacity-75">
        {searchTerm && selectedCategory ? (
          <>La ricerca "{searchTerm}" nella categoria "{selectedCategory}" non ha prodotto risultati.</>
        ) : searchTerm ? (
          <>La ricerca "{searchTerm}" non ha prodotto risultati.</>
        ) : selectedCategory ? (
          <>Non sono stati trovati giochi nella categoria "{selectedCategory}".</>
        ) : (
          <>Non sono stati trovati giochi con i filtri selezionati.</>
        )}
      </p>
      
      <div className="mt-4">
        <p className="text-light">Suggerimenti:</p>
        <ul className="list-unstyled text-light opacity-75">
          <li><i className="bi bi-check-circle me-2 text-warning"></i>Prova con un termine di ricerca diverso</li>
          <li><i className="bi bi-check-circle me-2 text-warning"></i>Rimuovi i filtri attivi</li>
          <li><i className="bi bi-check-circle me-2 text-warning"></i>Controlla che non ci siano errori di digitazione</li>
        </ul>
      </div>
    </div>
  );
}