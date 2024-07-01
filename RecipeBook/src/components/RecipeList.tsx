import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes, selectRecipes, selectLoading, selectError } from '../store/slices/recipeSlice';
import { AppDispatch } from '../store/store';

const RecipeList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const recipes = useSelector(selectRecipes);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    useEffect(() => {
        dispatch(fetchRecipes());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <ul>
            {recipes.map((recipe) => (
                <div key={recipe.id}
                    className=''>
                    <img src={`http://localhost:8080${recipe.image}`} alt={recipe.name} />
                    <h3>{recipe.name}</h3>
                    <p></p>
                </div>
            ))}
        </ul>
    );
};

export default RecipeList;
