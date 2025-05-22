import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TypeVideogameLong } from "../types/Type";

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<TypeVideogameLong | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchGame() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:3001/videogames/${id}`);
        if (!response.ok) throw new Error("Errore nel recupero dati");
        const data: TypeVideogameLong = await response.json();
        setGame(data);
      } catch (err: any) {
        setError(err.message || "Errore sconosciuto");
      } finally {
        setLoading(false);
      }
    }

    fetchGame();
  }, [id]);

  if (loading) return <p>Caricamento...</p>;
  if (error) return <p>Errore: {error}</p>;
  if (!game) return <p>Gioco non trovato</p>;

  return (
    <div>
      <h1>{game.title}</h1>
      {/* mostra qui i dettagli */}
      <p>Anno: {game.year}</p>
      <p>Prezzo: €{game.price}</p>
      {/* etc */}
    </div>
  );
}
