import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userType, snackbarType, bookmarkVideoType } from '../types/types';
import axios from 'axios';

interface UserState {
    isAppLoading: boolean;
    isAuthenticated: boolean;
    user?: userType;
    snackbar: snackbarType;
};

interface BookmarkState {
    movies: bookmarkVideoType[];
    tvSeries: bookmarkVideoType[];
    loading: boolean;
};

const initialUserState: UserState = {
    isAppLoading: true,
    isAuthenticated: false,
    user: undefined,
    snackbar: { open: false, vertical: "bottom", horizontal: "right", message: "" },
};

const initialBookmarkState: BookmarkState = {
    movies: [],
    tvSeries: [],
    loading: true,
}

const token = localStorage.getItem('token');

// Async Thunks
export const fetchProfile = createAsyncThunk(
    'user/fetchProfile',
    async () => {
        try {
            const response = await axios.get('/auth/me',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return response.data?.content?.data;
        } catch (error) {
            console.log('FETCH USER PROFILE ERROR');
        }
    }
);

export const fetchBookmark = createAsyncThunk(
    'bookmark/fetchBookmark',
    async (search: any) => {
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
    async (videoInfo: any, bookmark_type: any) => {
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
    async (bookmarkId: any) => {
        try {
            await axios.delete(`/bookmark/delete?bookmarkId=${bookmarkId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return "Bookmark deleted successfully";
        } catch (error) {
            console.log('REMOVE BOOKMARK ERROR');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
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
    initialState: initialBookmarkState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    },
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
            .addCase(createBookmark.fulfilled, () => {
                // Optionally handle optimistic updates here
            })
            .addCase(removeBookmark.fulfilled, () => {
                // Optionally handle optimistic updates here
            });
    },
});

export const { resetSnackbar, login, setSnackbar } = userSlice.actions;
export const { setLoading } = bookmarkSlice.actions;

export const userReducer = userSlice.reducer;
export const bookmarksReducer = bookmarkSlice.reducer;
