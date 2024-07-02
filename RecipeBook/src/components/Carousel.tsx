import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { iCuisine } from "../store/slices/cuisineSlice";
import { fetchRecipes, iRecipe, selectError, selectLoading, selectRecipes } from "../store/slices/recipeSlice";
import { AppDispatch, RootState } from "../store/store";
import Slider from "react-slick";

const CuisineCarousel: React.FC<iCuisine> = ({ id, name }) => {
    const dispatch: AppDispatch = useDispatch();
    const recipes = useSelector((state: RootState) => selectRecipes(state).filter(recipe => recipe.id === id));
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    useEffect(() => {
        dispatch(fetchRecipes());
    }, [dispatch]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>{name} Recipes</h2>
            <Slider {...settings}>
                {recipes.map((recipe: iRecipe) => (
                    <div key={recipe.id}>
                        <img src={recipe.image} alt={recipe.name} />
                        <h3>{recipe.name}</h3>
                        <p>{recipe.ingredients.join(', ')}</p>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default CuisineCarousel;