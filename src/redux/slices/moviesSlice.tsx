import {
    Action,
    createAsyncThunk,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';

import { DataState, MovieDetails, MovieItem } from '../../models';

const token = import.meta.env.VITE_TOKEN_OMDB;
const connect = axios.create({
    baseURL: `https://www.omdbapi.com/?apikey=${token}&`,
});

const initialState: DataState = {
    movies: [],
    favorites: [],
    favoritesId: [],
    movieDetails: null,
    isLoading: false,
    error: null,
    search: '',
};

interface Answer {
    res: MovieItem[],
    search: string,
}

const removeFromArray = (arr: string[], value: string) => {
    const index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
};

export const getMovies = createAsyncThunk<
    Answer,
    string,
    { rejectValue: string }
>('movies/getMovies', async function (search, { rejectWithValue }) {
    const res = await connect.get(``, { params: { s: search } });

    if (res.data.Response === 'False') {
        return rejectWithValue(res.data.Error);
    }

    return { res: res.data.Search, search };
});

export const getMovieDetails = createAsyncThunk<
    MovieDetails,
    { id: string },
    { rejectValue: string }
>('movies/getMovieDetails', async function (id, { rejectWithValue }) {
    const res = await connect.get(``, { params: { i: id.id } });

    if (res.data.Response === 'False') {
        return rejectWithValue(res.data.Error);
    }

    return res.data;
});

const MoviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        addFavorite(state, action: PayloadAction<MovieItem>) {
            state.favorites.push(action.payload);
            state.favoritesId.push(action.payload.imdbID);
        },
        removeFavorite(state, action: PayloadAction<MovieItem>) {
            state.favorites = state.favorites.filter(
                (movie) => movie.imdbID != action.payload.imdbID
            );
            removeFromArray(state.favoritesId, action.payload.imdbID);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMovies.fulfilled, (state, action) => {
                state.movies = action.payload.res;
                state.search = action.payload.search;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(getMovieDetails.fulfilled, (state, action) => {
                state.movieDetails = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(getMovieDetails.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getMovies.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.isLoading = false;
                state.error = action.payload;
                state.search = '';
            });
    },
});

export const { addFavorite, removeFavorite } = MoviesSlice.actions;

export default MoviesSlice.reducer;

function isError(action: Action) {
    return action.type.endsWith('rejected');
}
