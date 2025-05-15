import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TypeVideogameShort } from "./types/Type";
import Layout from "./layout/Layout";
import HomePage from "./Pages/HomePage";
import DetailPage from "./Pages/DetalPage";
import NotFoundPage from "./Pages/NotFoundPage";

function App() {
  const [videogames, setVideogames] = useState<TypeVideogameShort[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVideogames = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch("http://localhost:3001/videogames");
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data && Array.isArray(data)) {
        setVideogames(data);
      } else {
        throw new Error("Formato dati non valido");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore nel caricamento dei dati");
      console.error("Errore nel caricamento dei videogiochi:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVideogames();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage videogames={videogames} isLoading={isLoading} error={error} />} />
          <Route path="/videogames/:id" element={<DetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;