import { useEffect, useMemo, useState, useRef } from "react";
import { getGenres, type Genres } from "../api/genreApi";

type GenrePickerProps = {
  selectedGenres: Genres[];
  onChange: (items: Genres[]) => void;
};

export function GenrePicker({
  selectedGenres,
  onChange,
}: GenrePickerProps) {
  const [availableGenres, setAvailableGenres] = useState<Genres[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function loadGenres() {
      try {
        setIsLoading(true);
        setLoadError(null);
        const items = await getGenres();
        setAvailableGenres(items);
      } catch(error) {
        console.error("Failed to load shopping items:", error);
        setLoadError("Could not load genres.");
      } finally {
        setIsLoading(false);
      }
    }
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    loadGenres();
  }, []);

  const selectedGenreIDs = useMemo(
    () => new Set(selectedGenres.map((item) => item.id)),
    [selectedGenres],
  );

  const filteredGenres = useMemo(() => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    return availableGenres.filter((item) => {
      const isAlreadySelected = selectedGenreIDs.has(item.id);
      const matchesSearch = normalizedSearchTerm.length === 0 || item.name.toLowerCase().includes(normalizedSearchTerm);
      return !isAlreadySelected && matchesSearch;
    });
  }, [availableGenres, searchTerm, selectedGenreIDs]);

  function addGenre(item: Genres) {
    onChange([...selectedGenres, item]);
    setSearchTerm("");
    setIsDropdownOpen(false);
  }

  function setMainGenre(itemID: string) {
    onChange(selectedGenres.map((item) => item.id == itemID ? {...item, main: !item.main} : item));
  }

  function removeGenre(itemID: string) {
    onChange(selectedGenres.filter((item) => item.id !== itemID));
  }

  return (
    <div ref={containerRef} className="position-relative">
      <label htmlFor="shoppingItemSearch" className="form-label">
        Genres
      </label>

      <div className="border rounded p-2 bg-white">
        {selectedGenres.length > 0 && (
        <div className="d-flex flex-column gap-2 mb-2">
          {selectedGenres.map((item) => {
            return (
              <div
                key={item.id}
                className={`d-flex align-items-center justify-content-between border rounded px-2 py-2 ${
                  item.main ? "border-primary bg-primary-subtle" : "bg-light"
                }`}
              >
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="checkbox"
                    className="form-check-input mt-0"
                    name="mainShoppingItem"
                    checked={item.main}
                    onChange={() => setMainGenre(item.id)}
                  />

                  <span className="fw-medium">{item.name}</span>

                  {item.main && (
                    <span className="badge text-bg-primary">
                      Main
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  aria-label={`Remove ${item.name}`}
                  onClick={() => removeGenre(item.id)}
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>
      )}

        <input
          id="shoppingItemSearch"
          type="text"
          className="form-control border-0 shadow-none px-0"
          placeholder="Search and add items..."
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
            setIsDropdownOpen(true);
          }}
          onFocus={() => setIsDropdownOpen(true)}
        />
      </div>

      {isDropdownOpen && (
        <div
          className="position-absolute top-100 start-0 end-0 bg-white border rounded shadow-sm mt-1"
          style={{ zIndex: 1000, maxHeight: "240px", overflowY: "auto" }}
        >
          {isLoading && (
            <div className="px-3 py-2 text-muted small">Loading items...</div>
          )}

          {loadError && (
            <div className="px-3 py-2 text-danger small">{loadError}</div>
          )}

          {!isLoading && !loadError && filteredGenres.length === 0 && (
            <div className="px-3 py-2 text-muted small">
              No matching items found.
            </div>
          )}

          {!isLoading &&
            !loadError &&
            filteredGenres.map((item) => (
              <button
                key={item.id}
                type="button"
                className="dropdown-item w-100 text-start px-3 py-2"
                onClick={() => addGenre(item)}
              >
                {item.name}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}