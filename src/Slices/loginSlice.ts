import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login ,refreshp,singup, singupbuilding} from '../Api/loginAPI';
import { User } from '../model/user';
import { RootState } from '../app/store';
import { toast } from 'react-toastify';



export interface CounterState {
  user: User[];
  acsses: string;
  refresh: string;
  login: boolean
  to_remember:boolean
  loginreject:boolean

}

const initialState: CounterState = {
  user: [],
  refresh:"",
  acsses: "",
  login: false,
  to_remember:false,
  loginreject:false,

};
export const loginAsync = createAsyncThunk(
  'login/login',
  async (user: User) => {
   const response = await login(user);
    return response.data;
  }
);
export const refreshAsync = createAsyncThunk(
  'login/refreshp',
  async (refresh: string) => {
   const response = await refreshp(refresh);
    return response.data;
  }
);
export const singuphAsync = createAsyncThunk(
  'login/singup',
  async (data: any) => {
   const response = await singup(data.singupData,data.profile);
    return response.data;
  }
);
export const singupbuildingAsync = createAsyncThunk(
  'login/singupbuilding',
  async (user: any) => {
   const response = await singupbuilding(user);
    return response.data;
  }
);

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loguot: (state) => {
      state.login = false
      state.to_remember = false;
      state.refresh = ""
      state.acsses = ""
      localStorage.setItem("refresh",state.refresh) 
      localStorage.setItem("access",state.acsses)
      toast.warning("Hope to see you again soon",{autoClose: 1000}); 
    } , 
    remember: (state) => {
      state.to_remember = !state.to_remember
    },
    to_singup: (state) => {
      state.loginreject = !state.loginreject
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.acsses = action.payload.access
        state.refresh = action.payload.refresh
        state.login = true
        localStorage.setItem("access",action.payload.access)
        if(state.to_remember){
          localStorage.setItem("refresh",action.payload.refresh) 
         }
         toast.success("Hi, welcome back",{position: "top-center"});
         
      })
      .addCase(loginAsync.rejected, (state, action) => {
        refreshAsync(localStorage.getItem("refresh") || "")
         toast.error("Error trying to log in. Check the fields again",{position: "top-center"})
      })
      .addCase(refreshAsync.fulfilled, (state, action) => {
        localStorage.setItem("refresh",action.payload.refresh) 
        localStorage.setItem("access",action.payload.access)
        state.acsses = action.payload.access
        state.refresh = action.payload.refresh
        state.login = true
      })
      .addCase(refreshAsync.rejected, (state, action) => {
        // if ( window.location.href !== 'http://44.202.160.222/home'){
        // window.location.href = 'http://44.202.160.222/home';}
        

     })
  },
}); 

export const {loguot,remember,to_singup} = loginSlice.actions;
export const selectacsses = (state: RootState) => state.login.acsses
export const selecrefresh = (state: RootState) => state.login.refresh
export const selectlog = (state: RootState) => state.login.login
export const selectsingup = (state: RootState) => state.login.loginreject


export default loginSlice.reducer;


