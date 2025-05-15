import { TypeVideogameLong } from "../types/Type";

type CompareButtonProps = {
  game: TypeVideogameLong;
  selectedGames: TypeVideogameLong[];
  onSelectForCompare: (game: TypeVideogameLong) => void;
  onUnselectForCompare: (gameId: number) => void;
};

export default function CompareButton({ 
  game, 
  selectedGames, 
  onSelectForCompare, 
  onUnselectForCompare 
}: CompareButtonProps) {
  // Verifica se il gioco è già selezionato per il confronto
  const isSelected = selectedGames.some(selectedGame => selectedGame.id === game.id);
  
  // Verifica se possiamo selezionare altri giochi (max 2)
  const canSelect = selectedGames.length < 2 || isSelected;
  
  const handleClick = () => {
    if (isSelected) {
      onUnselectForCompare(game.id);
    } else if (canSelect) {
      onSelectForCompare(game);
    }
  };
  
  return (
    <button 
      className={`btn btn-sm ${isSelected ? 'btn-success' : 'btn-outline-warning'} compare-btn`}
      onClick={handleClick}
      disabled={!canSelect && !isSelected}
      aria-label={isSelected ? 'Rimuovi dal confronto' : 'Aggiungi al confronto'}
    >
      {isSelected ? (
        <>
          <i className="bi bi-check-circle me-1"></i>
          Selezionato
        </>
      ) : (
        <>
          <i className="bi bi-arrow-left-right me-1"></i>
          Confronta
        </>
      )}
    </button>
  );
}