import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../store";

export interface iRecipe {
    id: number;
    name: string;
    ingredients: string[];
    instructions: string,
    cuisineId: number,
    dietId: number,
    difficultyId: number,
    image: string
}

export interface iRecipeState {
    recipes: iRecipe[];
    loading: boolean;
    error: string | null;
}

const initialState: iRecipeState = {
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
        fetchRecipesSuccess(state, action: PayloadAction<iRecipe[]>) {
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
        const response = await axios.get<iRecipe[]>("http://localhost:8080/recipes");
        dispatch(fetchRecipesSuccess(response.data));
    } catch (error) {
        if (axios.isAxiosError(error))
        dispatch(fetchRecipesFailure(error.message));
    }
};

export const selectRecipes = (state: { recipes: iRecipeState }) => state.recipes.recipes;
export const selectLoading = (state: { recipes: iRecipeState }) => state.recipes.loading;
export const selectError = (state: { recipes: iRecipeState }) => state.recipes.error;

export const { fetchRecipesStart, fetchRecipesSuccess, fetchRecipesFailure } = recipeSlice.actions;

export const recipesReducer = recipeSlice.reducer;