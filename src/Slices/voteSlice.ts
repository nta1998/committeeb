import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { add, delVote, editVote, get } from '../Api/voteAPI';
import { RootState } from '../app/store';
import { Vote } from '../model/vote';

export interface CounterState {
  vote_pepole: Vote[]
  ref:boolean

}

const initialState: CounterState = {
  vote_pepole:[],
  ref:false
};


export const getVoteAsync = createAsyncThunk(
  'vote/get',
  async (token: string) => {
    const response = await get(token);
    return response.data;
  }
);
export const addAsync = createAsyncThunk(
  'vote/add',
  async (vote: any) => {
    const response = await add(vote.vote, vote.token);
    return response.data;
  }
);
export const editAsync = createAsyncThunk(
  'vote/editVote',
  async (data: any) => {
    const response = await editVote(data.people, data.token,data.profile);
    return response.data;
  }
);
export const delVoteAsync = createAsyncThunk(
  'vote/delVote',
  async (data: any) => {
    console.log(data)
    const response = await delVote(data.id, data.token);
    return response.data;
  }
);
export const voteSlice = createSlice({
  name: 'vote',
  initialState,

  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVoteAsync.fulfilled, (state, action) => {
        state.vote_pepole = action.payload;
      })
      .addCase(addAsync.fulfilled, (state, action) => {
        toast.success("Adding to Vote successful");
          state.ref = !state.ref
      })
      .addCase(getVoteAsync.rejected, (state, action) => {
        toast.error("error occurred. Please try again later");

      })
      .addCase(addAsync.rejected, (state, action) => {
        toast.error("error occurred. Please try again later");

      })
      .addCase(editAsync.fulfilled, (state, action) => {
        toast.success("Adding to Vote successful");
        state.ref = !state.ref
      })
      .addCase(editAsync.rejected, (state, action) => {
        toast.error("error occurred. Please try again later");
      })
      .addCase(delVoteAsync.fulfilled, (state, action) => {
        toast.success("Delete from Vote successful");
        state.ref = !state.ref
      })
      .addCase(delVoteAsync.rejected, (state, action) => {
        toast.error("error occurred. Please try again later");
      })

  }
});

export const {} = voteSlice.actions;

export const selecvote = (state: RootState) => state.vote.vote_pepole;
export const selecVoteflag = (state: RootState) => state.vote.ref;


export default voteSlice.reducer;


