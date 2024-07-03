import React from 'react';
import { iRecipe } from '../store/slices/recipeSlice';

interface SearchResultsProps {
    recipes: iRecipe[];
    dietMap: { [key: string]: string };
    difficultyMap: { [key: string]: string };
}

const SearchResults: React.FC<SearchResultsProps> = ({ recipes, dietMap, difficultyMap }) => {
    return (
        <div>
            {recipes.map((recipe) => (
                <div key={recipe.id}
                    className='card flex flex-wrap gap-2 p-3 m-8'>
                    <div style={{ backgroundImage: `url(http://localhost:8080${recipe.image})` }}
                        className='image flex-shrink-0'>
                    </div>
                    <div className='flex flex-col flex-grow p-2'>
                        <div className='mb-4'>
                            <h3>{recipe.name}</h3>
                        </div>
                        <div className='flex flex-wrap justify-between'>
                            <div className='flex flex-col mb-4 w-full xl:w-1/3'>
                                <p><span>Diet: </span> {dietMap[recipe.dietId]}</p>
                                <p><span>Difficulty: </span> {difficultyMap[recipe.difficultyId]}</p>
                            </div>
                            <div className='flex flex-col mb-4 w-full xl:w-1/3'>
                                <span>Ingredients:</span>
                                {recipe.ingredients.map((ingredient) => (
                                    <li key={ingredient}>{ingredient}</li>
                                ))}
                            </div>
                            <div className='flex flex-col mb-4 w-full xl:w-1/3'>
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

export default SearchResults;
