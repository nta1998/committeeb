import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { editPayprofile, editprofile,profileget, profilegetall } from '../Api/profileAPI';
import { RootState, AppThunk } from '../app/store';
import { post } from '../model/post';
import { Profile } from '../model/profile';


export interface CounterState {
    data: Profile[];
    post: post[]
    ref: boolean
    profile:Profile
    colorTheme:boolean
    start:boolean
}

const initialState: CounterState = {
    post: [],
    ref: false,
    data:[],
    profile:new Profile(),
    colorTheme: false,
    start:false
};


export const getAsync = createAsyncThunk(
    'profile/profileget',
    async (token: string) => {
        const response = await profileget(token);
        return response.data;
    }
);
export const getAsyncAll = createAsyncThunk(
    'profile/profilegetall',
    async (token: string) => {
        const response = await profilegetall(token);
        return response.data;
    }
);
export const editAsync = createAsyncThunk(
    'profile/editprofile',
    async (file: any) => {
        const response = await editprofile(file.formData,file.token,file.id);
        return response.data;
    }
);
export const editPayAsync = createAsyncThunk(
    'profile/editPayprofile',
    async (file: any) => {
        const response = await editPayprofile(file.profile,file.token);
        return response.data;
    }
);

export const profileSlice = createSlice({
    name: 'profile',
    initialState,

    reducers: {
    colorThemeChange(state,action){
        state.colorTheme = action.payload
    }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAsyncAll.fulfilled, (state, action) => {
            state.data = action.payload

        })
        .addCase(getAsync.fulfilled, (state, action) => {
                state.profile = action.payload[0]
                state.start = true
        })
        .addCase(editAsync.fulfilled, (state, action) => {
                state.ref = !state.ref
                toast.success("Profile edit successful")
        })
        .addCase(editPayAsync.fulfilled, (state, action) => {
            state.ref = !state.ref
            toast.success("Profile edit successful")
    })
        .addCase(editPayAsync.rejected, (state, action) => {
            state.ref = !state.ref
            toast.error("Error Occurred. Please try again later")
    })
    },
});

export const  {colorThemeChange} = profileSlice.actions;

export const selectGetProfile = (state: RootState) => state.profile.data;
export const selectGetProfileOne = (state: RootState) => state.profile.profile;
export const selectpost = (state: RootState) => state.profile.post;
export const selecflag = (state: RootState) => state.profile.ref;
export const seleccolor = (state: RootState) => state.profile.colorTheme;
export const selestart = (state: RootState) => state.profile.start;

export default profileSlice.reducer;
