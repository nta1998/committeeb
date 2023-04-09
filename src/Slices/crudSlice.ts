import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { add, delete_crud, edit, get, postget } from '../Api/crudAPI';
import { RootState, AppThunk } from '../app/store';
import { post } from '../model/post';
import { Profile } from '../model/profile';


export interface CounterState {
  data:Profile[] ;
  post:post[]
  ref:boolean

}

const initialState: CounterState = {
  data: [],
  post:[],
  ref:false
};


export const getAsync = createAsyncThunk(
  'crud/get',
  async (token:string) => {
    const response = await get(token);
    return response.data;
  }
);
export const getpostAsync = createAsyncThunk(
  'crud/postget',
  async (token:string) => {
    const response = await postget(token);
    return response.data;
  }
);
export const addAsync = createAsyncThunk(
  'crud/add',
  async (file:any) => {
    const response = await add(file.formData,file.token);
    return response.data;
  }
);
export const editAsync = createAsyncThunk(
  'crud/edit',
  async (file: any) => {
    console.log(file)
    const response = await edit(file.formData,file.token,file.id);
    return response.data;
  }
);
export const deleteAsync = createAsyncThunk(
  'crud/fetchCount',
  async (user: any) => {
    const response = await delete_crud(user.id,user.token);
    return response.data;
  }
);

export const crudSlice = createSlice({
  name: 'crud',
  initialState,

  reducers: {
    increment: (state) => {

      state.data =[];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAsync.fulfilled, (state, action) => {
  
        state.data = action.payload;
      })
      .addCase(getpostAsync.fulfilled, (state, action) => {
          state.post = action.payload;
      })
      .addCase(deleteAsync.fulfilled, (state, action) => {
        state.ref = !state.ref;
    })
    .addCase(editAsync.fulfilled, (state, action) => {
      state.ref = !state.ref;
  })
    .addCase(addAsync.fulfilled, (state, action) => {
      state.ref = !state.ref;
  })
  },
});

export const {increment} = crudSlice.actions;

export const selectget = (state: RootState) => state.crud.data;
export const selectpost = (state: RootState) => state.crud.post;
export const selecflag = (state: RootState) => state.crud.ref;

export default crudSlice.reducer;
