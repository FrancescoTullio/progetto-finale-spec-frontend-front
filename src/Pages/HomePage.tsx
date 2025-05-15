import { useMemo, useState } from "react";
import { TypeVideogameShort } from "../types/Type";
import SearchForm from "../components/SearchForm";
import GameList from "../components/GameList";
import LoadingSpinner from "../components/LoadingSpinner";
import FilterSortControls, { SortOption } from "../components/FilterSortControls";
import CompareButton from "../components/CompareButton";
import GameComparer from "../components/GameComparer";

type Props = {
  videogames: TypeVideogameShort[] | null;
  isLoading: boolean;
  error: string | null;
};

export default function HomePage({ videogames, isLoading, error }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("");
  const [selectedGames, setSelectedGames] = useState<TypeVideogameShort[]>([]);

  const categories = useMemo(() => {
    if (!videogames) return [];
    const uniqueCategories = [...new Set(videogames.map(game => game.category))];
    return uniqueCategories.sort();
  }, [videogames]);

  const filteredVideogames = useMemo(() => {
    if (!videogames) return null;
    
    let filtered = videogames;
    
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((game) => 
        game.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== "") {
      filtered = filtered.filter((game) => 
        game.category === selectedCategory
      );
    }
    
    if (sortOption !== "") {
      const [field, direction] = sortOption.split("-");
      
      return [...filtered].sort((a, b) => {
        const valueA = field === "title" ? a.title : a.category;
        const valueB = field === "title" ? b.title : b.category;
        
        return direction === "asc" 
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      });
    }
    
    return filtered;
  }, [videogames, searchTerm, selectedCategory, sortOption]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
  };

  const handleSelectForCompare = (game: TypeVideogameShort) => {
    if (selectedGames.length < 2) {
      setSelectedGames([...selectedGames, game]);
    }
  };

  const handleUnselectForCompare = (gameId: number) => {
    setSelectedGames(selectedGames.filter(game => game.id !== gameId));
  };

  const handleCloseComparer = () => {
    setSelectedGames([]);
  };

  if (isLoading) {
    return (
      <div className="container">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="alert alert-danger mt-5" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          Errore: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="game-hub bg-dark text-light pb-5">
      <div className="container">
        <header className="py-5 text-center">
          <h1 className="display-4 fw-bold text-warning mb-3">
            <i className="bi bi-controller me-2"></i>Game Hub
          </h1>
          <p className="lead text-light opacity-75">Scopri la tua prossima avventura di gioco</p>
        </header>
        
        <section className="mb-5">
          <SearchForm onSearch={handleSearch} />
          
          {videogames && videogames.length > 0 && (
            <div className="mt-4">
              <FilterSortControls 
                categories={categories}
                selectedCategory={selectedCategory}
                sortOption={sortOption}
                onCategoryChange={handleCategoryChange}
                onSortChange={handleSortChange}
              />
            </div>
          )}
          
          <div className="mt-4">
            {videogames && videogames.length > 0 ? (
              <GameList 
                games={videogames} 
                filteredGames={filteredVideogames}
                searchTerm={searchTerm}
                selectedCategory={selectedCategory}
                selectedGames={selectedGames}
                onSelectForCompare={handleSelectForCompare}
                onUnselectForCompare={handleUnselectForCompare}
              />
            ) : (
              <div className="text-center py-5">
                <i className="bi bi-controller display-1 text-warning mb-3"></i>
                <h3 className="text-warning">Nessun gioco disponibile</h3>
                <p className="text-light opacity-75">Non ci sono videogiochi da visualizzare al momento.</p>
              </div>
            )}
          </div>
        </section>

        <GameComparer 
          selectedGames={selectedGames}
          onClose={handleCloseComparer}
          onRemoveGame={handleUnselectForCompare}
        />
      </div>
    </div>
  );
}