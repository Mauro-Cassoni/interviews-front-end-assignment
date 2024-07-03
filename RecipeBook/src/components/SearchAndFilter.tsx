import React, { useState, useEffect } from 'react';
import axios from 'axios';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

interface Cuisine {
    id: string;
    name: string;
}

interface Diet {
    id: string;
    name: string;
}

interface Difficulty {
    id: string;
    name: string;
}

interface SearchAndFilterProps {
    onSearch: (query: string, filters: Filters) => void;
}

interface Filters {
    cuisineId?: string;
    dietId?: string;
    difficultyId?: string;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({ onSearch }) => {
    const [cuisines, setCuisines] = useState<Cuisine[]>([]);
    const [diets, setDiets] = useState<Diet[]>([]);
    const [difficulties, setDifficulties] = useState<Difficulty[]>([]);
    const [query, setQuery] = useState('');
    const [filters, setFilters] = useState<Filters>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [cuisinesRes, dietsRes, difficultiesRes] = await Promise.all([
                    axios.get(`${apiBaseUrl}/cuisines`),
                    axios.get(`${apiBaseUrl}/diets`),
                    axios.get(`${apiBaseUrl}/difficulties`),
                ]);

                setCuisines(cuisinesRes.data);
                setDiets(dietsRes.data);
                setDifficulties(difficultiesRes.data);
            } catch (error) {
                console.error('Error fetching filter data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSearch = () => {
        if (query.length >= 3 || Object.values(filters).some(value => value)) {
            onSearch(query, filters);
        }
    };

    useEffect(() => {
        handleSearch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, filters]);

    return (
        <div className="search-and-filter flex flex-wrap gap-4 p-4">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search recipes..."
                className="p-2 border rounded"
            />

            <div className="flex flex-wrap gap-4">
                <select
                    value={filters.cuisineId || ''}
                    onChange={(e) => setFilters({ ...filters, cuisineId: e.target.value || undefined })}
                    className="p-2 border rounded"
                >
                    <option value="">All Cuisines</option>
                    {cuisines.map((cuisine) => (
                        <option key={cuisine.id} value={cuisine.id}>
                            {cuisine.name}
                        </option>
                    ))}
                </select>

                <select
                    value={filters.dietId || ''}
                    onChange={(e) => setFilters({ ...filters, dietId: e.target.value || undefined })}
                    className="p-2 border rounded"
                >
                    <option value="">All Diets</option>
                    {diets.map((diet) => (
                        <option key={diet.id} value={diet.id}>
                            {diet.name}
                        </option>
                    ))}
                </select>


                <select
                    value={filters.difficultyId || ''}
                    onChange={(e) => setFilters({ ...filters, difficultyId: e.target.value || undefined })}
                    className="p-2 border rounded"
                >
                    <option value="">All Difficulties</option>
                    {difficulties.map((difficulty) => (
                        <option key={difficulty.id} value={difficulty.id}>
                            {difficulty.name}
                        </option>
                    ))}
                </select>
            </div>

            <button onClick={handleSearch}
                className="button">
                Search
            </button>
        </div>
    );
};

export default SearchAndFilter;
