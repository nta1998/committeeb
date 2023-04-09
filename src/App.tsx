import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Outlet } from 'react-router-dom';
import { refreshAsync, selectlog } from './Slices/loginSlice';
import { createTheme, NextUIProvider } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { getAsyncAll, getAsync, seleccolor, selectGetProfileOne,selecflag, selestart } from './Slices/profileSlice';
import { getAsyncbuilding, selectBuildingFlag } from './Slices/buildingSlice';
import FooterComponent from './component/Footer';
import NavbarC from './component/Navbar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAdAsync, getpayadsAsync, getpoolAsync, selecAdsflag } from './Slices/adsSlice';
import { getProductAsync, selecFlag } from './Slices/productSlice';
import { getVoteAsync, selecVoteflag } from './Slices/voteSlice';
import { selectchatSocket, selectconnect, selectcontent, selectonline, selectpop, selectref, setconnect, setcontent, setonline, setpop } from './Slices/chatSlice';


function App() {
  const dispatch = useAppDispatch()  
  const profile = useAppSelector(selectGetProfileOne)
  const is_login = useAppSelector(selectlog)
  const flag = useAppSelector(selectBuildingFlag)
  const flagProflie = useAppSelector(selecflag)
  const flagStore = useAppSelector(selecFlag)
  const flagVote = useAppSelector(selecVoteflag)
  
  const start = useAppSelector(selestart)

  const connect = useAppSelector(selectconnect)
  const content = useAppSelector(selectcontent)
  const online = useAppSelector(selectonline)
  const pop = useAppSelector(selectpop)
  const ref = useAppSelector(selectref)
  const chatSocket = useAppSelector(selectchatSocket)

  const color = useAppSelector(seleccolor)
  const token = localStorage.getItem("access") || ""
  const flagAd = useAppSelector(selecAdsflag)
///////// profile////////
useEffect(() => {
  dispatch(getAsync(token))
}, [is_login,flagProflie])
///////////Ads////////////
  useEffect(() => {
    if (is_login){
    dispatch(getAdAsync(token))
    dispatch(getpoolAsync(token))
    dispatch(getpayadsAsync(token))}
  }, [flagAd,start,is_login])
//////////Committee/////////
useEffect(() => {
  if (is_login){
  if (start){
  dispatch(getAsyncAll(token))
  dispatch(getAsyncbuilding({token:token,"id":profile?.building_id?.id}))}}
}, [flagProflie,start,is_login])

////////////store/////////
useEffect(() => {
  if (is_login){
  dispatch(getProductAsync(token))}
}, [flagStore,is_login])
//////////vote////////
useEffect(() => {
  if (is_login){
  dispatch(getVoteAsync(token))}
}, [flagVote,is_login])
//////chat///////////


chatSocket.onmessage = async (e) => {

  let data = JSON.parse(e.data)

  console.log(data)
  if (data.type === "user") {
      if (connect) {
          chatSocket.send(JSON.stringify({ "command": "new_user", "new_user": { "fullname": profile?.full_name, "img": profile?.profile_pic, "profile_id": profile?.id, "building_id": profile.building_id?.id } }))
          chatSocket.send(JSON.stringify({ "command": "get_messages", "building_id": profile?.building_id?.id }))
          dispatch(setconnect(!connect))
      }
  }
  if (data.type === "chat") {
    dispatch(setcontent(data.message.info))
    dispatch(setpop(true))
  }
  if (data.building_id === 1) {
    dispatch(setcontent(data))
  }
  if (data.Type === "chat_message") {
    console.log("first")
    dispatch(setcontent(data))
  }
  if (data.type === "user_connect") {
    dispatch(setonline(data.message))
  }

}

useEffect(() => {
if (pop && content[content.length - 1]?.profile_id?.full_name !== profile.full_name){
    toast.info(`${content[content.length - 1]?.profile_id?.full_name} send a new message` ,{
        position: "top-right",autoClose: 10000
    })
}    

}, [content.length])

window.addEventListener('beforeunload', (e) => {

const confirmationMessage = 'Are you sure you want to leave?';
e.returnValue = confirmationMessage;

let userConfirmed = false;

if (window.event) {
    // Internet Explorer
    userConfirmed = ((window.event as MouseEvent).clientY < 0);
} else if (typeof e !== 'undefined') {
    // Other browsers
    userConfirmed = (e.returnValue !== null);
}

if (userConfirmed) {
    chatSocket.close()
} else {
    console.log("first")
}
});


  const lightTheme = createTheme({
    type: 'light',
    theme: {
    }
  })
  const darkTheme = createTheme({
    type: 'dark',
    theme: {
    }
  })

  useEffect(() => {
    dispatch(refreshAsync(localStorage.getItem('refresh') || ""))
  }, [])
  useEffect(() => {
    const token = localStorage.getItem("access") || ""
    if (is_login){
    dispatch(getAsync(token))
    setTimeout(() => {
      dispatch(getAsyncbuilding({ token, "id": profile?.building_id?.id }))
    }, 1000)}
  }, [is_login, flag])

  return (
    <NextThemesProvider>
      <NextUIProvider theme={color ? darkTheme:lightTheme}>
        <NavbarC />
        <br />
        <ToastContainer
          
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={color ? "dark" : "light"} />

        <Outlet></Outlet>
        <br />
        <br />
        <br />
        <FooterComponent />
      </NextUIProvider>
    </NextThemesProvider>

  );
}

export default App;
