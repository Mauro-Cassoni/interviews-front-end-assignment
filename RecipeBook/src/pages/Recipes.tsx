import RecipeList from "../components/RecipeList"

export const Recipes = () => {
    return (
        <>
            <div>
                <h2 className="my-3 text-center font-bold underline-title">All Recipes</h2>
            </div>
            <RecipeList />
        </>
    )
}
