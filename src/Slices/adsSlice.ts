import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { get, add, getPayAds, getPool, addPool, addPayAds, editPool } from '../Api/adsAPI';
import { RootState } from '../app/store';
import { Ads, Payads, Pool } from '../model/ads';



export interface CounterState {
  ads: Ads[]
  pool: Pool[]
  payads: Payads[]
  ref: boolean
  data: {"message":string,"sub":string};


}

const initialState: CounterState = {
  ads: [],
  pool: [],
  payads: [],
  ref: false,
  data: {message:"",sub:""}
};

export const getpoolAsync = createAsyncThunk(
  'ads/getPool',
  async (token: string) => {
    const response = await getPool(token);
    return response.data;
  }
);
export const addpoolAsync = createAsyncThunk(
  'ads/addPool',
  async (pool: Pool) => {
    const response = await addPool(pool, pool.token);
    return response.data;
  }
);
export const addVoteAsync = createAsyncThunk(
  'ads/editPool',
  async (pool: any) => {

    const response = await editPool(pool.pool,pool.token,pool.action,pool.profile);
    return response.data;
  }
);
export const getAdAsync = createAsyncThunk(
  'ads/get',
  async (token: string) => {
    const response = await get(token);
    return response.data;
  }
);
export const addadlAsync = createAsyncThunk(
  'ads/add',
  async (ads: Ads) => {
    const response = await add(ads, ads.token);
    return response.data;
  }
);

export const getpayadsAsync = createAsyncThunk(
  'ads/getPayAds',
  async (token: string) => {
    const response = await getPayAds(token);
    return response.data;
  }
);
export const addpayadsAsync = createAsyncThunk(
  'ads/addPayAds',
  async (payads: Payads) => {
    const response = await addPayAds(payads);
    return response.data;
  }
);



export const adsSlice = createSlice({
  name: 'ads',
  initialState,

  reducers: {

  },

  extraReducers: (builder) => {

    builder
      .addCase(getAdAsync.fulfilled, (state, action) => {
        state.ads = action.payload;
      })
      .addCase(getAdAsync.rejected, (state, action) => {
        toast.error("Error Occurred.\n Please try again later");
      })
      .addCase(getpoolAsync.fulfilled, (state, action) => {
        state.pool = action.payload;
      })
      .addCase(getpoolAsync.rejected, (state, action) => {
        toast.error("Error Occurred.\n Please try again later");
      })
      .addCase(getpayadsAsync.fulfilled, (state, action) => {
        state.payads = action.payload;
      })
      .addCase(getpayadsAsync.rejected, (state, action) => {
        toast.error("Error Occurred.\n Please try again later");
      })
      .addCase(addpoolAsync.fulfilled, (state, action) => {
        state.ref = !state.ref;
        toast.success("New Pool created");
      })
      .addCase(addpoolAsync.rejected, (state, action) => {
        toast.error("Error Occurred.\n Please try again later");
      })
      .addCase(addadlAsync.fulfilled, (state, action) => {
        state.ref = !state.ref
        toast.success("New Pool created");
      })
      .addCase(addadlAsync.rejected, (state, action) => {
        toast.error("Error Occurred.\n Please try again later");
      })
      .addCase(addpayadsAsync.fulfilled, (state, action) => {
        state.ref = !state.ref
        toast.success("New Payment Ad created");
      })
      .addCase(addpayadsAsync.rejected, (state, action) => {
        toast.error("Error Occurred.\n Please try again later");
      })
      .addCase(addVoteAsync.fulfilled, (state, action) => {
        state.ref = !state.ref
        toast.success("Thank you for voting");
      })
      .addCase(addVoteAsync.rejected, (state, action) => {
        toast.error("Error Occurred.\n Please try again later");
      })
  }
});

export const {} = adsSlice.actions;

export const selecads = (state: RootState) => state.ads.ads;
export const selecpool = (state: RootState) => state.ads.pool;
export const selecpayads = (state: RootState) => state.ads.payads;
export const selecAdsflag = (state: RootState) => state.ads.ref;
export default adsSlice.reducer;




