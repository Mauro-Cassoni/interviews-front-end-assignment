import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { fetchRecipes, iRecipe, selectError, selectLoading, selectRecipes } from "../store/slices/recipeSlice";
import { AppDispatch, RootState } from "../store/store";
import Slider from "react-slick";
import { iDifficulty } from "../store/slices/difficultySlice";

const selectFilteredRecipes = createSelector(
    (state: RootState) => selectRecipes(state),
    (_: RootState, id: number) => id,
    (recipes, id) => recipes.filter(recipe => recipe.difficultyId === id)
);

const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) {
        return text;
    } else {
        return text.slice(0, maxLength) + "...";
    }
};

const Carousel: React.FC<iDifficulty> = ({ id, name }) => {
    const dispatch: AppDispatch = useDispatch();

    const recipes = useSelector((state: RootState) => selectFilteredRecipes(state, id));
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    useEffect(() => {
        dispatch(fetchRecipes());
    }, [dispatch]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            }
        ],
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="slider mb-14">
            <h2 className="my-3 text-center">{name} Recipes</h2>
            <Slider {...settings}>
                {recipes.map((recipe: iRecipe) => (
                    <div key={recipe.id}>
                        <div className="image" style={{ backgroundImage: `url(http://localhost:8080${recipe.image})` }}>
                            <div className="bg" />
                            <h2 className="name">{truncateText(recipe.name, 19)}</h2>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Carousel;
