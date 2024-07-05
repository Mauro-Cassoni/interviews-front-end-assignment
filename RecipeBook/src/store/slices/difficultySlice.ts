import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export interface iDifficulty {
    id: number;
    name: string;
}

interface iDifficultyState {
    difficulties: iDifficulty[];
    loading: boolean;
    error: string | null;
}

const initialState: iDifficultyState = {
    difficulties: [],
    loading: false,
    error: null,
};

export const fetchDifficulties = createAsyncThunk<iDifficulty[], void, { rejectValue: string }>(
    'difficulties/fetchDifficulties',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<iDifficulty[]>(`${apiBaseUrl}/difficulties`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.message);
            } else {
                return rejectWithValue('Generic error while fetching difficulties.');
            }
        }
    }
);

const difficultySlice = createSlice({
    name: 'difficulties',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDifficulties.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDifficulties.fulfilled, (state, action: PayloadAction<iDifficulty[]>) => {
                state.difficulties = action.payload;
                state.loading = false;
            })
            .addCase(fetchDifficulties.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'something went wrong, try reloading the page';
            });
    }
});

export const selectDifficulties = (state: { difficulties: iDifficultyState }) => state.difficulties.difficulties;
export const selectDifficultiesLoading = (state: { difficulties: iDifficultyState }) => state.difficulties.loading;
export const selectDifficultiesError = (state: { difficulties: iDifficultyState }) => state.difficulties.error;

export default difficultySlice.reducer;
