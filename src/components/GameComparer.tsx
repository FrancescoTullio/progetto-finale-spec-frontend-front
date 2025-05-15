import { useState, useEffect } from "react";
import { TypeVideogameLong } from "../types/Type";

type GameComparerProps = {
  selectedGames: TypeVideogameLong[];
  onClose: () => void;
  onRemoveGame: (gameId: number) => void;
};

export default function GameComparer({ selectedGames, onClose, onRemoveGame }: GameComparerProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Effetto per animare l'entrata del comparatore
  useEffect(() => {
    if (selectedGames.length > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [selectedGames]);

  // Se non ci sono giochi selezionati, non mostrare niente
  if (selectedGames.length === 0) {
    return null;
  }

  return (
    <div className={`game-comparer ${isVisible ? 'show' : ''}`}>
      <div className="comparer-modal bg-dark text-light p-4 rounded-3 shadow">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">
            <i className="bi bi-arrow-left-right me-2 text-warning"></i>
            Confronto Giochi
          </h2>
          <button 
            className="btn btn-outline-light" 
            onClick={onClose}
            aria-label="Chiudi comparatore"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {selectedGames.length < 2 ? (
          <div className="alert alert-warning">
            <i className="bi bi-info-circle me-2"></i>
            Seleziona un altro gioco per effettuare il confronto ({selectedGames.length}/2)
          </div>
        ) : (
          <div className="row comparison-content">
            {selectedGames.map((game) => (
              <div key={game.id} className="col-md-6 mb-3">
                <div className="card bg-dark border-warning h-100">
                  <div className="position-relative">
                    <img 
                      src={game.img} 
                      alt={game.title} 
                      className="card-img-top comparison-image"
                    />
                    <button
                      className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                      onClick={() => onRemoveGame(game.id)}
                      aria-label={`Rimuovi ${game.title} dal confronto`}
                    >
                      <i className="bi bi-x"></i>
                    </button>
                  </div>
                  
                  <div className="card-body">
                    <h3 className="card-title text-warning">{game.title}</h3>
                    
                    <div className="comparison-details">
                      <div className="comparison-item mb-2">
                        <span className="fw-bold text-light opacity-75">Categoria:</span>
                        <span className="badge bg-warning text-dark ms-2">{game.category}</span>
                      </div>
                      
                      <div className="comparison-item mb-2">
                        <span className="fw-bold text-light opacity-75">Valutazione:</span>
                        <div className="ms-2 d-inline-block">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <i 
                              key={index}
                              className={`bi ${index < game.vote ? 'bi-star-fill' : 'bi-star'} text-warning`}
                            ></i>
                          ))}
                          <span className="ms-1 text-light">({game.vote}/5)</span>
                        </div>
                      </div>

                      <div className="comparison-item mb-2">
                        <span className="fw-bold text-light opacity-75">Prezzo:</span>
                        <span className="ms-2">{game.price ? `€${game.price.toFixed(2)}` : 'Gratuito'}</span>
                      </div>

                      <div className="comparison-item mb-2">
                        <span className="fw-bold text-light opacity-75">Piattaforme:</span>
                        <span className="ms-2">{game.platform.join(', ')}</span>
                      </div>
                      
                      <div className="comparison-item mb-2">
                        <span className="fw-bold text-light opacity-75">Multiplayer:</span>
                        <span className="ms-2">{game.multiplayer ? 'Sì' : 'No'}</span>
                      </div>
                      
                      <div className="comparison-item mb-2">
                        <span className="fw-bold text-light opacity-75">Anno:</span>
                        <span className="ms-2">{game.year}</span>
                      </div>
                      
                      <div className="comparison-item mb-2">
                        <span className="fw-bold text-light opacity-75">Software House:</span>
                        <span className="ms-2">{game.company}</span>
                      </div>
                      
                      <div className="comparison-item mb-2">
                        <span className="fw-bold text-light opacity-75">PEGI:</span>
                        <span className="ms-2">{game.pegi}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <style jsx>{`
        .game-comparer {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: rgba(0, 0, 0, 0.85);
          z-index: 1000;
          transform: translateY(100%);
          transition: transform 0.3s ease-in-out;
          max-height: 80vh;
          overflow-y: auto;
        }
        
        .game-comparer.show {
          transform: translateY(0);
        }
        
        .comparer-modal {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .comparison-image {
          height: 200px;
          object-fit: cover;
        }
        
        @media (max-width: 768px) {
          .game-comparer {
            max-height: 90vh;
          }
        }
      `}</style>
    </div>
  );
}