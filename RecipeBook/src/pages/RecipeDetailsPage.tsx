import React from 'react';
import { useParams } from 'react-router-dom';
import RecipeDetails from '../components/RecipeDetails';

const RecipeDetailsPage: React.FC = () => {
    const { recipeId } = useParams<{ recipeId: string }>();

    if (!recipeId) {
        return <div>Invalid recipe ID</div>;
    }

    return (
        <div>
            <RecipeDetails recipeId={recipeId} />
        </div>
    );
};

export default RecipeDetailsPage;
