import { GameCardProps } from "../Type/Type"
import { Link } from "react-router-dom"
import { useFavorites } from "../Contex/FavoritesContext"
import { useEffect, useState, memo } from "react"
import UseVideoGameDetail from "../Hook/UseVideoGameDetail"
import CompareButton from "./CompareButton"

function GameCard({ game }: GameCardProps) {
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();
    const isGameFavorite = isFavorite(game.id);
    const [fullGameData, setFullGameData] = useState<any>(null);
    const { fetchVideoGameDetail, videogameDetail } = UseVideoGameDetail();

    const handleFavoriteClick = () => {
        if (isGameFavorite) {
            removeFavorite(game.id);
        } else {
            addFavorite(game);
        }
    };

    // Carica i dati completi del gioco quando richiesto per il confronto
    useEffect(() => {
        const loadFullGameData = async () => {
            await fetchVideoGameDetail(game.id);
        };
        
        loadFullGameData();
    }, [game.id, fetchVideoGameDetail]);

    // Aggiorna fullGameData quando videogameDetail cambia
    useEffect(() => {
        if (videogameDetail && videogameDetail.id === game.id) {
            setFullGameData(videogameDetail);
        }
    }, [videogameDetail, game.id]);

    return (
        <div className="col">   
            <div className="card h-100 shadow-sm">
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 text-truncate">🎮 {game.title}</h5>
                    <div className="d-flex gap-2">
                        {fullGameData && <CompareButton game={fullGameData} />}
                        <button 
                            onClick={handleFavoriteClick}
                            className={`btn btn-sm ${isGameFavorite ? 'btn-warning' : 'btn-outline-warning'}`}
                            title={isGameFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
                        >
                            {isGameFavorite ? '❤️' : '🤍'}
                        </button>
                    </div>
                </div>
                <div className="card-body d-flex flex-column">
                    <div className="mb-3">
                        <span className="badge bg-secondary fs-6">
                            🏷️ {game.category}
                        </span>
                    </div>
                    
                    <div className="mb-3 text-muted">
                        <small>
                            🕒 Aggiornato: {new Date(game.updatedAt).toLocaleDateString('it-IT')}
                        </small>
                    </div>
                    
                    <div className="mt-auto">
                        <Link to={`/game/${game.id}`} className="btn btn-outline-primary w-100">
                            👁️ Visualizza dettagli
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(GameCard)