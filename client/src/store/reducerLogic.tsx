import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// Async Thunks
export const fetchProfile = createAsyncThunk(
    'user/fetchProfile',
    async () => {
        try {
            const response = await axios.get('/auth/me');
            return response.data?.content?.data;
        } catch (error) {
            console.log('FETCH USER PROFILE ERROR');
        }
    }
);

export const fetchBookmark = createAsyncThunk(
    'bookmark/fetchBookmark',
    async (search) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`/bookmark/get?search=${search}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data?.data;
        } catch (error) {
            console.log('FETCH BOOKMARKS ERROR');
        }
    }
);

export const createBookmark = createAsyncThunk(
    'bookmark/createBookmark',
    async (videoInfo, bookmark_type) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                '/bookmark/create',
                { videoInfo, bookmark_type },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return "Bookmarked successfully";
        } catch (error) {
            console.log('CREATE BOOKMARK ERROR');
        }
    }
);

export const removeBookmark = createAsyncThunk(
    'bookmark/removeBookmark',
    async (bookmarkId) => {
        try {
            await axios.delete(`/bookmark/delete?bookmarkId=${bookmarkId}`);
            return "Bookmark deleted successfully";
        } catch (error) {
            console.log('REMOVE BOOKMARK ERROR');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isAppLoading: true,
        isAuthenticated: false,
        user: undefined,
        snackbar: { open: false, vertical: "bottom", horizontal: "right", message: "" },
    },
    reducers: {
        resetSnackbar(state) {
            state.snackbar = { open: false, vertical: "bottom", horizontal: "right", message: "" };
        },
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        setSnackbar: (state, action) => {
            state.snackbar = { ...state.snackbar, ...action.payload };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.isAppLoading = true;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload;
                state.isAppLoading = false;
            })
            .addCase(fetchProfile.rejected, (state) => {
                state.isAppLoading = false;
                state.isAuthenticated = false;
            });
    },
});

const bookmarkSlice = createSlice({
    name: 'bookmark',
    initialState: {
        movies: [],
        tvSeries: [],
        loading: true,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookmark.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBookmark.fulfilled, (state, action) => {
                state.movies = action.payload?.movie || [];
                state.tvSeries = action.payload?.tv || [];
                state.loading = false;
            })
            .addCase(fetchBookmark.rejected, (state) => {
                state.loading = false;
            })
            .addCase(createBookmark.fulfilled, (state, action) => {
                // Optionally handle optimistic updates here
            })
            .addCase(removeBookmark.fulfilled, (state, action) => {
                // Optionally handle optimistic updates here
            });
    },
});

export const { resetSnackbar, login, setSnackbar } = userSlice.actions;
export const userReducer = userSlice.reducer;
export const bookmarksReducer = bookmarkSlice.reducer;
