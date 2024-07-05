import React, { useEffect, useState } from 'react';
import { iRecipe } from '../store/slices/recipeSlice';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

interface SearchResultsProps {
    recipes: iRecipe[];
    dietMap: { [key: string]: string };
    difficultyMap: { [key: string]: string };
}

const SearchResults: React.FC<SearchResultsProps> = ({ recipes }) => {
    const [page, setPage] = useState(1);
    const [loadedDifficultyMap, setLoadedDifficultyMap] = useState<{ [key: string]: string }>({});
    const [loadedDietMap, setLoadedDietMap] = useState<{ [key: string]: string }>({});
    const [loadedCuisineMap, setLoadedCuisineMap] = useState<{ [key: string]: string }>({});

    const resultsPerPage = 10;

    const formatDietName = (name: string): string => {
        const parts = name.split('-').map((part, index) => index === 0 ? part.trim() : part.trim().toLowerCase());
        return parts.join(' ');
    };

    useEffect(() => {
        fetch(`${apiBaseUrl}/difficulties`)
            .then(response => response.json())
            .then(data => {
                const newDifficultyMap: { [key: string]: string } = {};
                data.forEach((difficulty: { id: string, name: string }) => {
                    newDifficultyMap[difficulty.id] = difficulty.name;
                });
                setLoadedDifficultyMap(newDifficultyMap);
            })
            .catch(error => {
                console.error('Error loading difficulty data:', error);
            });
    }, []);

    useEffect(() => {
        fetch(`${apiBaseUrl}/cuisines`)
            .then(response => response.json())
            .then(data => {
                const newCuisineMap: { [key: string]: string } = {};
                data.forEach((cuisine: { id: string, name: string }) => {
                    newCuisineMap[cuisine.id] = cuisine.name;
                });
                setLoadedCuisineMap(newCuisineMap);
            })
            .catch(error => {
                console.error('Error loading cuisine data:', error);
            });
    }, []);

    useEffect(() => {
        fetch(`${apiBaseUrl}/diets`)
            .then(response => response.json())
            .then(data => {
                const newDietsMap: { [key: string]: string } = {};
                data.forEach((diet: { id: string, name: string }) => {
                    newDietsMap[diet.id] = formatDietName(diet.name);
                });
                setLoadedDietMap(newDietsMap);
            })
            .catch(error => {
                console.error('Error loading diet data:', error);
            });
    }, []);

    const startIndex = (page - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;

    const totalPages = Math.ceil(recipes.length / resultsPerPage);

    const nextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const prevPage = () => {
        if (page > 1) {
            setPage(page - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div>
            {recipes.slice(startIndex, endIndex).map((recipe) => (
                <Link key={recipe.id} className='card flex flex-wrap gap-2 p-3 m-8' to={`/recipes/${recipe.id}`}>
                    <div style={{ backgroundImage: `url(${apiBaseUrl}${recipe.image})` }} className='image flex-shrink-0'>
                    </div>
                    <div className='flex flex-col flex-grow p-2'>
                        <div className='mb-4'>
                            <h3>{recipe.name}</h3>
                        </div>
                        <div className='flex flex-wrap justify-between'>
                            <div className='flex flex-col mb-4 w-full xl:w-1/3'>
                                <p><span>Cuisine: </span> {loadedCuisineMap[recipe.cuisineId]}</p>
                                <p><span>Diet: </span> {loadedDietMap[recipe.dietId]}</p>
                                <p><span>Difficulty: </span> {loadedDifficultyMap[recipe.difficultyId]}</p>
                            </div>
                            <div className='flex flex-col mb-4 w-full xl:w-1/3'>
                                <span>Ingredients:</span>
                                {recipe.ingredients.map((ingredient) => (
                                    <li key={uuidv4()}>{ingredient}</li>
                                ))}
                            </div>
                            <div className='flex flex-col mb-4 w-full xl:w-1/3'>
                                <span>Instructions:</span>
                                <p>{recipe.instructions}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}

            {recipes.length > 0 &&
                <div className='pagination flex justify-center my-4'>
                    <button onClick={prevPage} disabled={page === 1} className='button'>
                        Previous
                    </button>
                    <span className='px-4 py-2 mx-2'>{page} / {totalPages}</span>
                    <button onClick={nextPage} disabled={page === totalPages} className='button'>
                        Next
                    </button>
                </div>
            }
        </div>
    );
};

export default SearchResults;
