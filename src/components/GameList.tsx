import { TypeVideogameShort } from "../types/Type";
import CompareButton from "./CompareButton";

type GameListProps = {
  games: TypeVideogameShort[];
  filteredGames: TypeVideogameShort[] | null;
  searchTerm: string;
  selectedCategory: string;
  selectedGames: TypeVideogameShort[];
  onSelectForCompare: (game: TypeVideogameShort) => void;
  onUnselectForCompare: (gameId: number) => void;
};

export default function GameList({
  games,
  filteredGames,
  searchTerm,
  selectedCategory,
  selectedGames,
  onSelectForCompare,
  onUnselectForCompare,
}: GameListProps) {
  const displayedGames = filteredGames || games;

  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {displayedGames.map((game) => (
        <div key={game.id} className="col">
          <div className="game-card card h-100 bg-dark border-secondary">
            {game.img && (
              <img
                src={game.img}
                alt={game.title}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
            )}
            <div className="card-body">
              <h5 className="card-title text-warning">{game.title}</h5>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="badge bg-secondary">{game.category}</span>
                {game.vote && (
                  <div className="text-warning">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <i
                        key={i}
                        className={`bi ${i < game.vote! ? "bi-star-fill" : "bi-star"}`}
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="d-grid">
                <CompareButton
                  game={game}
                  selectedGames={selectedGames}
                  onSelectForCompare={onSelectForCompare}
                  onUnselectForCompare={onUnselectForCompare}
                />
                <a
                  href={`/videogames/${game.id}`}
                  className="btn btn-outline-light mt-2"
                >
                  <i className="bi bi-info-circle me-1"></i>
                  Dettagli
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}