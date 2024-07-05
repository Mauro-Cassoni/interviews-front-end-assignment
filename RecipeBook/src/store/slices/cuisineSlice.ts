import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;


export interface iCuisine {
    id: number,
    name: string,
}

export interface iCuisineState {
    cuisines: iCuisine[];
    loading: boolean;
    error: string | null;
}

const initialState: iCuisineState = {
    cuisines: [],
    loading: false,
    error: null,
}

export const fetchCuisines = createAsyncThunk<iCuisine[], void, { rejectValue: string }>(
    'cuisines/fetchCuisines',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<iCuisine[]>(`${apiBaseUrl}/cuisines`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.message);
            } else {
                return rejectWithValue('Generic error while fetching cuisines.');
            }
        }
    }
);

const cuisineSlice = createSlice({
    name: 'cuisines',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCuisines.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCuisines.fulfilled, (state, action: PayloadAction<iCuisine[]>) => {
                state.cuisines = action.payload;
                state.loading = false;
            })
            .addCase(fetchCuisines.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'something went wrong, try reloading the page';
            });
    }
});

export const selectCuisines = (state: { cuisines: iCuisineState }) => state.cuisines.cuisines;
export const selectCuisinesLoading = (state: { cuisines: iCuisineState }) => state.cuisines.loading;
export const selectCuisinesError = (state: { cuisines: iCuisineState }) => state.cuisines.error;

export const cuisinesReducer = cuisineSlice.reducer;