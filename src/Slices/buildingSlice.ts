import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { editBuilding, getbuilding, voteActiv } from '../Api/buildingAPI';
import { RootState } from '../app/store';
import { Building } from '../model/building';



export interface CounterState {
  data:Building;
  ref:boolean
}

const initialState: CounterState = {
  data:new Building(),
  ref:false
};


export const getAsyncbuilding = createAsyncThunk(
  'crud/getbuilding',
  async (data:any) => {
    const response = await getbuilding(data.token,data.id);
    return response.data;
  }
);
export const voteActivAsync = createAsyncThunk(
  'crud/voteActiv',
  async (bilding_data:any) => {
    const response = await voteActiv(bilding_data.building,bilding_data.token);
    return response.data;
  }
);
export const editAsync = createAsyncThunk(
  'crud/editBuilding',
  async (data:any) => {
    const response = await editBuilding(data.building,data.token);
    return response.data;
  }
);
// export const editAsync = createAsyncThunk(
//   'crud/edit',
//   async (file: any) => {
//     console.log(file)
//     const response = await (file.formData,file.token,file.id);
//     return response.data;
//   }
// );
// export const deleteAsync = createAsyncThunk(
//   'crud/fetchCount',
//   async (user: any) => {
//     const response = await (user.id,user.token);
//     return response.data;
//   }
// );

export const buildingSlice = createSlice({
  name: 'building',
  initialState,

  reducers: {

  },

  extraReducers: (builder) => {
    builder
      .addCase(getAsyncbuilding.fulfilled, (state, action) => {
        state.data = action.payload[0]
      })
      .addCase(getAsyncbuilding.rejected, (state, action) => {
        toast.error("error occurred. Please try again later")
      })
      .addCase(voteActivAsync.fulfilled, (state, action) => {
        state.ref = action.payload?.vote_active
        if (state.ref) toast.success("Voting Has Opened");
        else toast.warning("Voting Has Closed")
      })
      .addCase(voteActivAsync.rejected, (state, action) => {
        toast.error("error occurred. Please try again later")
      })
      .addCase(editAsync.fulfilled, (state, action) => {
          toast.success("The details of the building have been updated")
      })
      .addCase(editAsync.rejected, (state, action) => {
        toast.error("error occurred. Please try again later")
    })
   
   
  },
});

export const {} = buildingSlice.actions;

export const selectBuilding = (state: RootState) => state.building.data;
export const selectBuildingFlag = (state: RootState) => state.building.ref;


export default buildingSlice.reducer;