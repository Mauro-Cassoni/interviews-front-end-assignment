import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { recipesReducer } from './slices/recipeSlice';
import { cuisinesReducer } from "./slices/cuisineSlice";

const store = configureStore({
    reducer: {
        recipes: recipesReducer,
        cuisines: cuisinesReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export default store;
