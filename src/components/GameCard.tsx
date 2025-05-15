import { TypeVideogameLong } from "../types/Type";
import CompareButton from "./CompareButton";

type GameCardProps = {
  game: TypeVideogameLong;
  selectedGames: TypeVideogameLong[];
  onSelectForCompare: (game: TypeVideogameLong) => void;
  onUnselectForCompare: (gameId: number) => void;
};

export default function GameCard({ 
  game, 
  selectedGames, 
  onSelectForCompare, 
  onUnselectForCompare 
}: GameCardProps) {
  return (
    <div className="card h-100 bg-dark border-secondary game-card overflow-hidden">
      <div className="position-relative">
        <img 
          src={game.img} 
          className="card-img-top game-image" 
          alt={game.title} 
          loading="lazy"
        />
        
        {/* Badge per la categoria */}
        <div className="position-absolute top-0 start-0 m-2">
          <span className="badge bg-warning text-dark">
            {game.category}
          </span>
        </div>
        
        {/* Indicatore di selezione se il gioco è selezionato per il confronto */}
        {selectedGames.some(selected => selected.id === game.id) && (
          <div className="position-absolute top-0 end-0 m-2">
            <span className="badge bg-success">
              <i className="bi bi-check-circle me-1"></i>
              Selezionato per confronto
            </span>
          </div>
        )}
      </div>
      
      <div className="card-body d-flex flex-column">
        <h3 className="card-title h5 text-warning">{game.title}</h3>
        
        <div className="mt-2 mb-3">
          {/* Visualizzazione delle stelline di valutazione */}
          <div className="mb-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <i 
                key={index}
                className={`bi ${index < game.vote ? 'bi-star-fill' : 'bi-star'} text-warning`}
              ></i>
            ))}
            <span className="ms-1 text-light opacity-75">({game.vote}/5)</span>
          </div>
          
          {/* Prezzo del gioco */}
          <div className="game-price">
            {game.price ? (
              <span className="text-light fw-bold">€{game.price.toFixed(2)}</span>
            ) : (
              <span className="badge bg-success">Gratuito</span>
            )}
          </div>
        </div>
        
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <a href={`/game/${game.id}`} className="btn btn-primary btn-sm">
            <i className="bi bi-info-circle me-1"></i>
            Dettagli
          </a>
          
          <CompareButton 
            game={game}
            selectedGames={selectedGames}
            onSelectForCompare={onSelectForCompare}
            onUnselectForCompare={onUnselectForCompare}
          />
        </div>
      </div>
      
      <style jsx>{`
        .game-image {
          height: 180px;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        
        .game-card:hover .game-image {
          transform: scale(1.05);
        }
        
        .game-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .game-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}