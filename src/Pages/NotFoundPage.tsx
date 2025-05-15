import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="not-found-page text-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="error-container mb-4">
              <div className="display-1 text-warning fw-bold">404</div>
              <i className="bi bi-controller-disconnected display-4 text-warning mb-4"></i>
            </div>
            
            <h2 className="text-warning mb-4">Oops! Pagina non trovata</h2>
            
            <div className="mb-5">
              <p className="text-light opacity-75 mb-4">
                Sembra che tu stia cercando di accedere a un livello che non esiste.
                La pagina che stai cercando potrebbe essere stata rimossa, rinominata o non è temporaneamente disponibile.
              </p>
              
              <div className="error-code bg-dark text-warning border border-warning d-inline-block py-2 px-4 rounded-pill mb-4">
                <i className="bi bi-exclamation-triangle me-2"></i>
                <code>404 - Page Not Found</code>
              </div>
            </div>
            
            <div className="action-buttons">
              <Link to="/" className="btn btn-warning btn-lg px-4 me-3">
                <i className="bi bi-house-door-fill me-2"></i>
                Torna alla Home
              </Link>
              
              <button 
                onClick={() => window.history.back()} 
                className="btn btn-outline-warning btn-lg px-4"
              >
                <i className="bi bi-arrow-left me-2"></i>
                Torna Indietro
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-5 pt-3">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card bg-dark border-warning">
                <div className="card-body text-center p-4">
                  <h5 className="text-warning mb-3">Giochi Popolari</h5>
                  <p className="text-light opacity-75">
                    Mentre sei qui, dai un'occhiata ad alcuni dei nostri giochi più popolari
                  </p>
                  <Link to="/" className="btn btn-sm btn-warning">
                    Esplora Giochi
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}