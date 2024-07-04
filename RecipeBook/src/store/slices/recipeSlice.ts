import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../store";
import { createSelector } from 'reselect';


const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

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
    currentPage: number;
    totalPages: number;
}

const initialState: iRecipeState = {
    recipes: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
};

export const recipeSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {
        fetchRecipesStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchRecipesSuccess(state, action: PayloadAction<{ recipes: iRecipe[], totalPages: number }>) {
            state.recipes = action.payload.recipes;
            state.loading = false;
            state.totalPages = action.payload.totalPages;
        },
        fetchRecipesFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
    },
})

export const fetchRecipes = (page: number, limit: number): AppThunk => async (dispatch) => {
    try {
        dispatch(fetchRecipesStart());
        const response = await axios.get<iRecipe[]>(`${apiBaseUrl}/recipes?_page=${page}&_limit=${limit}`);
        const totalCount = response.headers['x-total-count'];
        const totalPages = Math.ceil(totalCount / limit);
        dispatch(fetchRecipesSuccess({ recipes: response.data, totalPages }));
    } catch (error) {
        if (axios.isAxiosError(error))
        dispatch(fetchRecipesFailure(error.message));
    }
};

const recipesStateSelector = (state: { recipes: iRecipeState }) => state.recipes;

export const selectRecipes = createSelector(
    recipesStateSelector,
    (state) => state.recipes
);

export const selectLoading = createSelector(
    recipesStateSelector,
    (state) => state.loading
);

export const selectError = createSelector(
    recipesStateSelector,
    (state) => state.error
);

export const selectCurrentPage = createSelector(
    recipesStateSelector,
    (state) => state.currentPage
);

export const selectTotalPages = createSelector(
    recipesStateSelector,
    (state) => state.totalPages
);

export const { fetchRecipesStart, fetchRecipesSuccess, fetchRecipesFailure, setCurrentPage } = recipeSlice.actions;

export const recipesReducer = recipeSlice.reducer;
