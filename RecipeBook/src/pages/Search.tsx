import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchAndFilter from '../components/SearchAndFilter';
import { iRecipe } from '../store/slices/recipeSlice';
import SearchResults from '../components/SearchResults';
import RecipeList from '../components/RecipeList';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const Search = () => {
    const [searchResults, setSearchResults] = useState<iRecipe[]>([]);
    const [dietMap, setDietMap] = useState<{ [key: string]: string }>({});
    const [difficultyMap, setDifficultyMap] = useState<{ [key: string]: string }>({});

    interface Filters {
        cuisineId?: string;
        dietId?: string;
        difficultyId?: string;
    }

    const handleSearch = async (query: string, filters: Filters) => {
        try {
            const response = await axios.get(`${apiBaseUrl}/recipes`, {
                params: {
                    q: query,
                    cuisineId: filters.cuisineId,
                    dietId: filters.dietId,
                    difficultyId: filters.difficultyId,
                },
            });
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    useEffect(() => {
        fetch('${apiBaseUrl}/diets')
            .then(response => response.json())
            .then(data => {
                const map: { [key: string]: string } = {};
                data.forEach((diet: { id: string, name: string }) => {
                    map[diet.id] = diet.name;
                });
                setDietMap(map);
            })
            .catch(error => console.error('Error fetching diets:', error));
    }, []);

    useEffect(() => {
        fetch('${apiBaseUrl}/difficulties')
            .then(response => response.json())
            .then(data => {
                const map: { [key: string]: string } = {};
                data.forEach((difficulty: { id: string, name: string }) => {
                    map[difficulty.id] = difficulty.name;
                });
                setDifficultyMap(map);
            })
            .catch(error => console.error('Error fetching difficulties:', error));
    }, []);

    return (
        <div>
            <div>
                <div>
                    <h2 className="mb-4 text-center font-bold border-b-2 border-[var(--primary)]">Search</h2>
                </div>
                <SearchAndFilter onSearch={handleSearch} />
                <SearchResults recipes={searchResults} dietMap={dietMap} difficultyMap={difficultyMap} />
            </div>
            <div>
                {searchResults.length === 0 && <RecipeList />}
            </div>
        </div>
    );
};
