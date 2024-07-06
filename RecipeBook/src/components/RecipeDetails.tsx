import React, { useEffect, useState } from 'react';
import { iRecipe } from '../store/slices/recipeSlice';
import { v4 as uuidv4 } from 'uuid';
import Loader from './Loader';
import SuccessMessage from './SuccessMessage';

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
    const [averageRating, setAverageRating] = useState<number | null>(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const [dietMap, setDietMap] = useState<{ [key: string]: string }>({});
    const [difficultyMap, setDifficultyMap] = useState<{ [key: string]: string }>({});
    const [cuisineMap, setCuisineMap] = useState<{ [key: string]: string }>({});

    const formatDietName = (name: string): string => {
        const parts = name.split('-').map((part, index) => index === 0 ? part.trim() : part.trim().toLowerCase());
        return parts.join(' ');
    };

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
                calculateAverageRating(data);
            })
            .catch(error => {
                console.error('Error fetching comments:', error);
            });
    }, [recipeId]);

    useEffect(() => {
        fetch(`${apiBaseUrl}/diets`)
            .then(response => response.json())
            .then(data => {
                const newDietsMap: { [key: string]: string } = {};
                data.forEach((diet: { id: string, name: string }) => {
                    newDietsMap[diet.id] = formatDietName(diet.name);
                });
                setDietMap(newDietsMap);
            })
            .catch(error => {
                console.error('Error loading diet data:', error);
            });
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
                calculateAverageRating([...comments, data]);
                setShowSuccessMessage(true);
            })
            .catch(error => {
                console.error('Error adding comment:', error);
            });
    };


    const renderStars = (rating: number) => {
        return (
            <div className="stars">
                {[...Array(5)].map((_, index) => (
                    <span key={index} className={index < rating ? 'filled' : 'empty'}>★</span>
                ))}
            </div>
        );
    };

    const calculateAverageRating = (comments: iComment[]) => {
        if (comments.length === 0) {
            setAverageRating(null);
            return;
        }
        const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
        const average = totalRating / comments.length;
        setAverageRating(average);
    };

    if (!recipe) {
        return <div><Loader /></div>;
    }

    return (
        <div className='recipe-details flex flex-wrap gap-5 m-8'>
            <div className='name-and-image w-full'>
                <div className='underline-title'>
                    <h2>{recipe.name}</h2>
                </div>
                <div style={{ backgroundImage: `url(${apiBaseUrl}${recipe.image})` }} className='image flex-shrink-0'></div>
                <div className='flex justify-center items-center'>
                    {averageRating !== null && (
                        <div className='mt-6 text-2xl'>
                            {renderStars(Math.round(averageRating))}
                        </div>
                    )}
                </div>
            </div>
            <section className='details-section flex flex-col p-2 md:w-1/2'>
                <div className='flex flex-col justify-between'>
                    <div className='underline-title'>
                        <h4>Details:</h4>
                    </div>
                    <div className='flex flex-col mb-4'>
                        <p><span>Cuisine: </span> {cuisineMap[recipe.cuisineId]}</p>
                        <p><span>Diet: </span> {dietMap[recipe.dietId]}</p>
                        <p><span>Difficulty: </span> {difficultyMap[recipe.difficultyId]}</p>
                    </div>
                    <div className='flex flex-col mb-4'>
                        <div className='underline-title'>
                            <h4>Ingredients:</h4>
                        </div>
                        <ul>
                            {recipe.ingredients.map((ingredient: string) => (
                                <li key={uuidv4()}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                    <div className='flex flex-col mb-4'>
                        <div className='underline-title'>
                            <h4>Instructions:</h4>
                        </div>
                        <p>{recipe.instructions}</p>
                    </div>
                </div>
            </section>
            <section className='comments-section'>
                <div className='underline-title'>
                    <h4>Comments</h4>
                </div>
                <ul>
                    {comments.map((comment) => (
                        <li key={comment.id} className='p-5 m-5 border-[1px] border-[var(--primary)] rounded-2xl'>
                            <span>Comment:</span> <p className='text-[var(--text)] inline'>{comment.comment}</p>
                            <div className='flex gap-2'><span>Rating: </span>{renderStars(comment.rating)}</div>
                            <div className='text-xs'><span>Date:</span>{new Date(comment.date).toLocaleDateString()}</div>
                        </li>
                    ))}
                </ul>
                <div className='add-comment'>
                    <div className='underline-title'>
                        <h4>Add a Comment</h4>
                    </div>
                    <textarea
                        required
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder='Write your comment here...'
                    />
                    <div className="rating-select">
                        {[...Array(5)].map((_, index) => (
                            <span
                                key={index}
                                className={index < newRating ? 'filled' : 'empty'}
                                onClick={() => setNewRating(index + 1)}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    <button
                        onClick={handleAddComment}
                        className='button disabled:opacity-50'
                        disabled={!newComment.trim()}
                    >
                        Send
                    </button>
                </div>
            </section>
            {showSuccessMessage && (
                <SuccessMessage
                    onClose={() => setShowSuccessMessage(false)}
                    text="Comment added successfully!"
                />
            )}
        </div>
    );
};

export default RecipeDetails;
