import RecipeList from "../components/RecipeList"

export const Recipes = () => {
    return (
        <>
            <div>
                <h2 className="my-3 text-center font-bold border-b-2 border-[var(--primary)]">All Recipes</h2>
            </div>
            <RecipeList />
        </>
    )
}
