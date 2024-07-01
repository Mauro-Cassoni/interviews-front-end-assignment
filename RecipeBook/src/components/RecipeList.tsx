import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes, selectRecipes, selectLoading, selectError } from '../store/slices/recipeSlice';
import { AppDispatch } from '../store/store';

const RecipeList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const recipes = useSelector(selectRecipes);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    const [dietMap, setDietMap] = useState<{ [key: string]: string }>({});
    const [difficultyMap, setDifficultyMap] = useState<{ [key: string]: string }>({});

    const formatDietName = (name: string): string => {
        const parts = name.split('-').map((part, index) => index === 0 ? part.trim() : part.trim().toLowerCase());
        return parts.join(' ');
    };

    useEffect(() => {
        dispatch(fetchRecipes());
    }, [dispatch]);

    useEffect(() => {
        fetch('http://localhost:8080/diets')
            .then(response => response.json())
            .then(data => {
                const map: { [key: string]: string } = {};
                data.forEach((diet: { id: string, name: string }) => {
                    const formattedName = formatDietName(diet.name);
                    map[diet.id] = formattedName;
                });
                setDietMap(map);
            })
            .catch(error => console.error('Error fetching diets:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/difficulties')
            .then(response => response.json())
            .then(data => {
                const map: { [key: string]: string } = {};
                data.forEach((difficulty: { id: string, name: string }) => {
                    map[difficulty.id] = difficulty.name;
                });
                setDifficultyMap(map);
            })
            .catch(error => console.error('Error fetching diets:', error));
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {recipes.map((recipe) => (
                <div key={recipe.id}
                    className='card flex flex-wrap md:flex-nowrap gap-2 p-3 m-3'>
                    <div style={{ backgroundImage: `url(http://localhost:8080${recipe.image})` }}
                        className='image flex-shrink-0'>
                    </div>
                    <div className='flex flex-col flex-grow p-2'>
                        <div className='text-center mb-4'>
                            <h3>{recipe.name}</h3>
                        </div>
                        <div className='flex flex-wrap md:flex-nowrap justify-between'>
                            <div className='flex flex-col mb-4 w-full md:w-1/3'>
                                <p><span>Diet: </span> {dietMap[recipe.dietId]}</p>
                                <p><span>Difficulty: </span> {difficultyMap[recipe.difficultyId]}</p>
                            </div>
                            <div className='flex flex-col mb-4 w-full md:w-1/3'>
                                <span>Ingredients:</span>
                                {recipe.ingredients.map((ingredient) => (
                                    <li key={Date.now()}>{ingredient}</li>
                                ))}
                            </div>
                            <div className='flex flex-col mb-4 w-full md:w-1/3'>
                                <span>Instructions:</span>
                                <p>{recipe.instructions}</p>
                            </div>
                        </div>

                    </div>
                </div>
            ))}
        </div>
    );
};

export default RecipeList;
