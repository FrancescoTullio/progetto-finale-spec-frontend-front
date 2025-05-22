import { TypeVideogameLong } from "../types/Type";

type GameComparerProps = {
  selectedGames: TypeVideogameLong[];
  onClose: () => void;
  onRemoveGame: (gameId: number) => void;
};

export default function GameComparer({
  selectedGames,
  onClose,
  onRemoveGame,
}: GameComparerProps) {
  return (
    <div className="game-comparer-container">
      <button onClick={onClose} className="btn btn-danger mb-3">Chiudi confronto</button>

      {selectedGames.length === 0 ? (
        <p>Nessun gioco selezionato per il confronto.</p>
      ) : (
        <div className="d-flex gap-3">
          {selectedGames.map((game) => (
            <div key={game.id} className="card p-3 bg-secondary text-light">
              <h5>{game.title}</h5>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => onRemoveGame(game.id)}
              >
                Rimuovi
              </button>
              {/* Qui puoi aggiungere altri dettagli per il confronto */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
