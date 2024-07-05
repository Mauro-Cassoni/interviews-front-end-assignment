import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SuccessMessage from './SuccessMessage';
const NewRecipeForm: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [instructions, setInstructions] = useState<string>('');
    const [cuisineId, setCuisineId] = useState<string>('');
    const [dietId, setDietId] = useState<string>('');
    const [difficultyId, setDifficultyId] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);

    const [cuisines, setCuisines] = useState<{ id: string; name: string; }[]>([]);
    const [diets, setDiets] = useState<{ id: string; name: string; }[]>([]);
    const [difficulties, setDifficulties] = useState<{ id: string; name: string; }[]>([]);

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchDropdownData = async () => {
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

        fetchDropdownData();
    }, [apiBaseUrl]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isFormValid()) {
            alert('Please fill in all fields.');
            return;
        }
        const formData = new FormData();
        formData.append('name', name);
        formData.append('ingredients', ingredients.join('\n'));
        formData.append('instructions', instructions);
        formData.append('cuisineId', cuisineId);
        formData.append('dietId', dietId);
        formData.append('difficultyId', difficultyId);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axios.post(`${apiBaseUrl}/recipes`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200 || response.status === 201) {
                setShowSuccessMessage(true);
                setName('');
                setIngredients([]);
                setInstructions('');
                setCuisineId('');
                setDietId('');
                setDifficultyId('');
                setImage(null);
            } else {
                alert('An error occurred while adding the recipe.');
            }
        } catch (error) {
            console.error('Error submitting the recipe:', error);
            alert('An error occurred while adding the recipe.');
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
        }
    };

    const isFormValid = () => {
        return name && ingredients.length > 0 && instructions && cuisineId && dietId && difficultyId && image;
    };

    const closeSuccessMessage = () => {
        setShowSuccessMessage(false);
    };

    return (
        <div className="new-recipe-form">
            <h2 className="my-3 text-center font-bold underline-title">Add New Recipe</h2>
            <form onSubmit={handleSubmit} className='new-recipe-form flex flex-col gap-5'>
                <label>
                    <span>Recipe Name*</span>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>

                <label>
                    <span>Ingredients*</span>
                    <textarea
                        value={ingredients.join('\n')}
                        onChange={(e) => setIngredients(e.target.value.split('\n'))}
                        placeholder="Separate ingredients with commas (e.g. Spaghetti, Cheese, Tomato, ...)"
                        required
                    />
                </label>

                <label>
                    <span>Instructions*</span>
                    <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
                </label>

                <label>
                    <span>Cuisine Type*</span>
                    <select value={cuisineId} onChange={(e) => setCuisineId(e.target.value)} required>
                        <option value="">Select a cuisine</option>
                        {cuisines.map(cuisine => (
                            <option key={cuisine.id} value={cuisine.id}>{cuisine.name}</option>
                        ))}
                    </select>
                </label>

                <label>
                    <span>Dietary Preference*</span>
                    <select value={dietId} onChange={(e) => setDietId(e.target.value)} required>
                        <option value="">Select a dietary preference</option>
                        {diets.map(diet => (
                            <option key={diet.id} value={diet.id}>{diet.name}</option>
                        ))}
                    </select>
                </label>

                <label>
                    <span>Difficulty Level*</span>
                    <select value={difficultyId} onChange={(e) => setDifficultyId(e.target.value)} required>
                        <option value="">Select a difficulty level</option>
                        {difficulties.map(difficulty => (
                            <option key={difficulty.id} value={difficulty.id}>{difficulty.name}</option>
                        ))}
                    </select>
                </label>

                <div className="file-input">
                    <label htmlFor="image-upload" className="file-label">
                        <span>Image*</span>
                        <div className='flex items-center'>
                            <div className='buttonImg'>Select Image</div>
                            <div className='textImage'>
                                {image && <span>{image.name}</span>}
                                {!image && <span>No images selected</span>}
                            </div>
                        </div>
                    </label>
                    <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className='hidden'
                    />
                </div>

                <div>
                    <button type="submit"
                        className={`button my-5 disabled:cursor-not-allowed disabled:opacity-50 `}
                        disabled={!isFormValid()}>Add Recipe</button>
                </div>
            </form>

            {showSuccessMessage && (
                <SuccessMessage
                    onClose={closeSuccessMessage}
                    text="Recipe added successfully!"
                    center={true}
                />
            )}
        </div>
    );
};

export default NewRecipeForm;
