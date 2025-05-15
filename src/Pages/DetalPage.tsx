import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TypeVideogameLong, isVideogameLong } from "../types/Type";
import LoadingSpinner from "../components/LoadingSpinner";
import CompareButton from "../components/CompareButton";

export default function DetailPage() {
  const { id } = useParams();
  const [game, setGame] = useState<TypeVideogameLong | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGames, setSelectedGames] = useState<TypeVideogameLong[]>([]);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(`http://localhost:3001/videogames/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (isVideogameLong(data)) {
          setGame(data);
        } else {
          throw new Error("Formato dati non valido");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Errore nel caricamento del gioco");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  const handleSelectForCompare = () => {
    if (game && selectedGames.length < 2) {
      setSelectedGames([...selectedGames, game]);
    }
  };

  const handleUnselectForCompare = () => {
    if (game) {
      setSelectedGames(selectedGames.filter(g => g.id !== game.id));
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="alert alert-danger">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        {error}
      </div>
    );
  }

  if (!game) {
    return <div className="alert alert-warning">Gioco non trovato</div>;
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={game.img}
            alt={game.title}
            className="img-fluid rounded mb-4"
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-warning mb-3">{game.title}</h1>
          <div className="d-flex justify-content-between mb-4">
            <span className="badge bg-warning text-dark fs-6">
              {game.category}
            </span>
            <div className="text-warning">
              {Array.from({ length: 5 }).map((_, i) => (
                <i
                  key={i}
                  className={`bi ${i < game.vote ? "bi-star-fill" : "bi-star"} me-1`}
                />
              ))}
              <span className="ms-1">({game.vote}/5)</span>
            </div>
          </div>

          <div className="mb-4">
            <CompareButton
              game={game}
              selectedGames={selectedGames}
              onSelectForCompare={handleSelectForCompare}
              onUnselectForCompare={handleUnselectForCompare}
            />
          </div>

          <div className="card bg-dark border-secondary mb-4">
            <div className="card-body">
              <h5 className="card-title text-light">Informazioni</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-dark text-light border-secondary">
                  <strong>Prezzo:</strong>{" "}
                  {game.price ? `€${game.price.toFixed(2)}` : "Gratuito"}
                </li>
                <li className="list-group-item bg-dark text-light border-secondary">
                  <strong>Piattaforme:</strong> {game.platform.join(", ")}
                </li>
                <li className="list-group-item bg-dark text-light border-secondary">
                  <strong>Multiplayer:</strong>{" "}
                  {game.multiplayer ? "Sì" : "No"}
                </li>
                <li className="list-group-item bg-dark text-light border-secondary">
                  <strong>Anno:</strong> {game.year}
                </li>
                <li className="list-group-item bg-dark text-light border-secondary">
                  <strong>Software House:</strong> {game.company}
                </li>
                <li className="list-group-item bg-dark text-light border-secondary">
                  <strong>PEGI:</strong> {game.pegi}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}