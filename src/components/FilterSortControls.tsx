
type SortOption = "title-asc" | "title-desc" | "category-asc" | "category-desc" | "";

type FilterSortControlsProps = {
  categories: string[];
  selectedCategory: string;
  sortOption: SortOption;
  onCategoryChange: (category: string) => void;
  onSortChange: (option: SortOption) => void;
};

export default function FilterSortControls({
  categories,
  selectedCategory,
  sortOption,
  onCategoryChange,
  onSortChange,
}: FilterSortControlsProps) {
  return (
    <div className="filter-sort-controls mb-4">
      <div className="card bg-dark border-warning">
        <div className="card-body">
          <div className="row g-3 align-items-center">
            <div className="col-md-6">
              <div className="filter-container">
                <label htmlFor="categoryFilter" className="form-label text-warning mb-2">
                  <i className="bi bi-filter me-2"></i>Filtra per Categoria
                </label>
                <select
                  id="categoryFilter"
                  className="form-select bg-dark text-light border-warning"
                  value={selectedCategory}
                  onChange={(e) => onCategoryChange(e.target.value)}
                >
                  <option value="">Tutte le Categorie</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="sort-container">
                <label htmlFor="sortSelect" className="form-label text-warning mb-2">
                  <i className="bi bi-sort-alpha-down me-2"></i>Ordina per
                </label>
                <select
                  id="sortSelect"
                  className="form-select bg-dark text-light border-warning"
                  value={sortOption}
                  onChange={(e) => onSortChange(e.target.value as SortOption)}
                >
                  <option value="">Nessun Ordinamento</option>
                  <option value="title-asc">Titolo (A-Z)</option>
                  <option value="title-desc">Titolo (Z-A)</option>
                  <option value="category-asc">Categoria (A-Z)</option>
                  <option value="category-desc">Categoria (Z-A)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Tipo esportato per l'opzione di ordinamento
export type { SortOption };