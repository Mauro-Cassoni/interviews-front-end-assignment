import React, { useEffect, useState } from 'react';
import { iRecipe } from '../store/slices/recipeSlice';
import { v4 as uuidv4 } from 'uuid';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

interface RecipeDetailsProps {
    recipeId: string;
}

export interface iComment {
    id?: number;
    recipeId: number;
    comment: string;
    rating: number;
    date: string;
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipeId }) => {
    const [recipe, setRecipe] = useState<iRecipe | null>(null);
    const [comments, setComments] = useState<iComment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [newRating, setNewRating] = useState(1);

    const [dietMap, setDietMap] = useState<{ [key: string]: string }>({});
    const [difficultyMap, setDifficultyMap] = useState<{ [key: string]: string }>({});
    const [cuisineMap, setCuisineMap] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        fetch(`${apiBaseUrl}/recipes/${recipeId}`)
            .then(response => response.json())
            .then((data: iRecipe) => {
                setRecipe(data);
            })
            .catch(error => {
                console.error('Error fetching recipe details:', error);
            });
    }, [recipeId]);

    useEffect(() => {
        fetch(`${apiBaseUrl}/recipes/${recipeId}/comments`)
            .then(response => response.json())
            .then((data: iComment[]) => {
                setComments(data);
            })
            .catch(error => {
                console.error('Error fetching comments:', error);
            });
    }, [recipeId]);

    useEffect(() => {
        fetch(`${apiBaseUrl}/diets`)
            .then(response => response.json())
            .then(data => {
                const map: { [key: string]: string } = {};
                data.forEach((diet: { id: number, name: string }) => {
                    map[diet.id] = diet.name;
                });
                setDietMap(map);
            })
            .catch(error => console.error('Error fetching diets:', error));
    }, []);

    useEffect(() => {
        fetch(`${apiBaseUrl}/difficulties`)
            .then(response => response.json())
            .then(data => {
                const map: { [key: string]: string } = {};
                data.forEach((difficulty: { id: number, name: string }) => {
                    map[difficulty.id] = difficulty.name;
                });
                setDifficultyMap(map);
            })
            .catch(error => console.error('Error fetching difficulties:', error));
    }, []);

    useEffect(() => {
        fetch(`${apiBaseUrl}/cuisines`)
            .then(response => response.json())
            .then(data => {
                const map: { [key: string]: string } = {};
                data.forEach((cuisine: { id: number, name: string }) => {
                    map[cuisine.id] = cuisine.name;
                });
                setCuisineMap(map);
            })
            .catch(error => console.error('Error fetching cuisines:', error));
    }, []);

    const handleAddComment = () => {
        const newCommentObj: iComment = {
            recipeId: parseInt(recipeId),
            comment: newComment,
            rating: newRating,
            date: new Date().toISOString(),
        };

        fetch(`${apiBaseUrl}/recipes/${recipeId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCommentObj),
        })
            .then(response => response.json())
            .then((data: iComment) => {
                setComments([...comments, data]);
                setNewComment('');
                setNewRating(1);
            })
            .catch(error => {
                console.error('Error adding comment:', error);
            });
    };

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div className='recipe-details flex flex-wrap gap-5 p-3 m-8'>
            <div className='name-and-image w-full'>
                <div className='mb-4 text-center w-full border-b-2 border-[var(--primary)]'>
                    <h2>{recipe.name}</h2>
                </div>
                <div style={{ backgroundImage: `url(${apiBaseUrl}${recipe.image})` }} className='image flex-shrink-0'></div>
            </div>
            <div className='details-section flex flex-col p-2 md:w-1/2'>
                <div className='flex flex-col justify-between'>
                    <span className='little-title'>Details:</span>
                    <div className='flex flex-col mb-4'>
                        <p><span>Cuisine: </span> {cuisineMap[recipe.cuisineId]}</p>
                        <p><span>Diet: </span> {dietMap[recipe.dietId]}</p>
                        <p><span>Difficulty: </span> {difficultyMap[recipe.difficultyId]}</p>
                    </div>
                    <div className='flex flex-col mb-4'>
                        <span className='little-title'>Ingredients:</span>
                        <ul>
                            {recipe.ingredients.map((ingredient: string) => (
                                <li key={uuidv4()}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                    <div className='flex flex-col mb-4'>
                        <span className='little-title'>Instructions:</span>
                        <p>{recipe.instructions}</p>
                    </div>
                </div>
            </div>
            <div className='comments-section'>
                <div className='underline-title'>
                    <span className='little-title'>Comments:</span>
                </div>
                <ul>
                    {comments.map((comment) => (
                        <li key={comment.id}>
                            <p>{comment.comment}</p>
                            <p>Rating: {comment.rating}</p>
                            <p>Date: {new Date(comment.date).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
                <div className='add-comment'>
                    <h4>Add a Comment</h4>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder='Write your comment here...'
                    />
                    <select
                        value={newRating}
                        onChange={(e) => setNewRating(parseInt(e.target.value))}>
                        {[1, 2, 3, 4, 5].map(rating => (
                            <option key={rating} value={rating}>{rating}</option>
                        ))}
                    </select>
                    <button onClick={handleAddComment}>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetails;
