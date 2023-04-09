import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import adsReducer from '../Slices/adsSlice';
import buildingReducer from '../Slices/buildingSlice';
import chatReducer from '../Slices/chatSlice';
import crudReducer from '../Slices/crudSlice';
import loginReducer from '../Slices/loginSlice';
import productReducer from '../Slices/productSlice';
import profileReducer from '../Slices/profileSlice';
import voteReducer from '../Slices/voteSlice';

export const store = configureStore({
  reducer: {
    login : loginReducer,
    crud: crudReducer,
    profile:profileReducer,
    ads: adsReducer,
    vote:voteReducer,
    product:productReducer,
    building:buildingReducer,
    chat:chatReducer
    
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
