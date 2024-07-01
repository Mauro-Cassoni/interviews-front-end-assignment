import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../store";

export interface Recipe {
    id: number;
    name: string;
    ingredients: string[];
    instructions: string,
    cuisineId: number,
    dietId: number,
    difficultyId: number,
    image: string
}

export interface RecipeState {
    recipes: Recipe[];
    loading: boolean;
    error: string | null;
}

const initialState: RecipeState = {
    recipes: [],
    loading: false,
    error: null,
};

export const recipeSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {
        fetchRecipesStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchRecipesSuccess(state, action: PayloadAction<Recipe[]>) {
            state.recipes = action.payload;
            state.loading = false;
        },
        fetchRecipesFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
})

export const fetchRecipes = (): AppThunk => async (dispatch) => {
    try {
        dispatch(fetchRecipesStart());
        const response = await axios.get<Recipe[]>("http://localhost:8080/recipes");
        dispatch(fetchRecipesSuccess(response.data));
    } catch (error) {
        if (axios.isAxiosError(error))
        dispatch(fetchRecipesFailure(error.message));
    }
};

export const selectRecipes = (state: { recipes: RecipeState }) => state.recipes.recipes;
export const selectLoading = (state: { recipes: RecipeState }) => state.recipes.loading;
export const selectError = (state: { recipes: RecipeState }) => state.recipes.error;

export const { fetchRecipesStart, fetchRecipesSuccess, fetchRecipesFailure } = recipeSlice.actions;

export const recipesReducer = recipeSlice.reducer;