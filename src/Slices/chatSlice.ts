import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { ChatM } from '../model/chat';
import { Online } from '../model/online';
import { profileSlice } from './profileSlice';




const profile = profileSlice.getInitialState().profile

export interface CounterState {
  ref: boolean
  connect: boolean
  content: ChatM[]
  pop: boolean
  online: Online[]
  chatSocket: WebSocket
}

const initialState: CounterState = {
  ref: false,
  connect: true,
  content: [],
  pop: false,
  online: [],
  //  chatSocket: new WebSocket(`wss://127.0.0.1:8000/ws/chat/${profile.building_id?.id}/${profile.id}/`)
  chatSocket: new WebSocket(`wss://${process.env.REACT_APP_WEBSOCKET}ws/chat/${profile.building_id?.id}/${profile.id}/`),
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,

  reducers: {
    setconnect: (state, action) => {
      state.connect = action.payload
      state.ref = !state.ref
    },
    setcontent: (state, action) => {
      state.content = action.payload
      state.ref = !state.ref
    },
    setpop: (state, action) => {
      state.pop = action.payload
      state.ref = !state.ref
    },
    setonline: (state, action) => {
      state.online = action.payload
      state.ref = !state.ref
    },

  },

});

export const { setconnect, setcontent, setpop, setonline } = chatSlice.actions;

export const selectconnect = (state: RootState) => state.chat.connect;
export const selectcontent = (state: RootState) => state.chat.content;
export const selectonline = (state: RootState) => state.chat.online;
export const selectpop = (state: RootState) => state.chat.pop;
export const selectref = (state: RootState) => state.chat.ref;
export const selectchatSocket = (state: RootState) => state.chat.chatSocket;




export default chatSlice.reducer;