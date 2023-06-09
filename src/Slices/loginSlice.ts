import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login ,refreshp,singup, singupbuilding} from '../Api/loginAPI';
import { User } from '../model/user';
import { RootState } from '../app/store';
import { toast } from 'react-toastify';
import confetti from 'canvas-confetti';


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
      sessionStorage.setItem("refresh",state.refresh) 
      sessionStorage.setItem("access",state.acsses)
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
    .addCase(singuphAsync.fulfilled, (state, action) => {
        confetti({particleCount: 1000, spread: 360, ticks: 100, zIndex: 100 })
        setTimeout(() => {
          window.location.href = "/"
        }, 2000);

    })
    .addCase(singuphAsync.rejected, (state, action) => {
      toast.error("Error Occurred. Please try again later",{position: "top-center"})
    })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.acsses = action.payload.access
        state.refresh = action.payload.refresh
        state.login = true
        localStorage.setItem("access",action.payload.access)
        sessionStorage.setItem("access",action.payload.access)
        if(state.to_remember){
          localStorage.setItem("refresh",action.payload.refresh) 
          sessionStorage.setItem("refresh",action.payload.refresh) 

         }
         toast.success("Hi, welcome back",{position: "top-center"});
         
      })
      .addCase(loginAsync.rejected, (state, action) => {
        refreshAsync(localStorage.getItem("refresh") || "")
         toast.error("Error trying to log in. Check the fields again",{position: "top-center"})
      })
      .addCase(singupbuildingAsync.rejected, (state, action) => {
         toast.error("Error Occurred. Please try again later",{position: "top-center"})
      })
      .addCase(singupbuildingAsync.fulfilled, (state, action) => {
        toast.success("Connect to the system and start managing the building 👉",{position: "top-center"})
     })
      .addCase(refreshAsync.fulfilled, (state, action) => {
        localStorage.setItem("refresh",action.payload.refresh) 
        localStorage.setItem("access",action.payload.access)
        sessionStorage.setItem("refresh",action.payload.refresh) 
        sessionStorage.setItem("access",action.payload.access)
        state.acsses = action.payload.access
        state.refresh = action.payload.refresh
        state.login = true
      })
      .addCase(refreshAsync.rejected, (state, action) => {
        // if ( window.location.href !== '/'){
        // window.location.href = '/';}
        

     })
  },
}); 

export const {loguot,remember,to_singup} = loginSlice.actions;
export const selectacsses = (state: RootState) => state.login.acsses
export const selecrefresh = (state: RootState) => state.login.refresh
export const selectlog = (state: RootState) => state.login.login
export const selectsingup = (state: RootState) => state.login.loginreject


export default loginSlice.reducer;


