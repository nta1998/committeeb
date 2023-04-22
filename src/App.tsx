import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Outlet } from 'react-router-dom';
import { refreshAsync, selectlog } from './Slices/loginSlice';
import { createTheme, Loading, NextUIProvider, Row } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { getAsyncAll, getAsync, seleccolor, selectGetProfileOne, selecflag, selestart } from './Slices/profileSlice';
import { getAsyncbuilding, selectBuildingFlag } from './Slices/buildingSlice';
import FooterComponent from './component/Footer';
import NavbarC from './component/Navbar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAdAsync, getpayadsAsync, getpoolAsync, selecAdsflag } from './Slices/adsSlice';
import { getProductAsync, selecFlag } from './Slices/productSlice';
import { getVoteAsync, selecVoteflag } from './Slices/voteSlice';
import { selectchatSocket, selectconnect, selectcontent, selectpop, setconnect, setcontent, setonline, setpop } from './Slices/chatSlice';


function App() {
  const dispatch = useAppDispatch()
  const profile = useAppSelector(selectGetProfileOne)
  const is_login = useAppSelector(selectlog)
  const flag = useAppSelector(selectBuildingFlag)
  const flagProflie = useAppSelector(selecflag)
  const flagStore = useAppSelector(selecFlag)
  const flagVote = useAppSelector(selecVoteflag)
  const [loder, setloder] = useState(false)

  const start = useAppSelector(selestart)

  const connect = useAppSelector(selectconnect)
  const content = useAppSelector(selectcontent)
  const pop = useAppSelector(selectpop)
  const chatSocket = useAppSelector(selectchatSocket)

  const color = useAppSelector(seleccolor)
  const token = localStorage.getItem("access") || sessionStorage.getItem("access") || ""
  const flagAd = useAppSelector(selecAdsflag)
  ///////// profile////////
  useEffect(() => {
    dispatch(getAsync(token))
  }, [is_login, flagProflie, dispatch, token])
  ///////////Ads////////////
  useEffect(() => {
    if (is_login) {
      dispatch(getAdAsync(token))
      dispatch(getpoolAsync(token))
      dispatch(getpayadsAsync(token))
    }
  }, [flagAd, start, is_login, dispatch, token])
  //////////Committee/////////
  useEffect(() => {
    if (is_login) {
      if (start) {
        dispatch(getAsyncAll(token))
        dispatch(getAsyncbuilding({ token: token, "id": profile?.building_id?.id }))
      }
    }
  }, [flagProflie, start, is_login, dispatch, token, profile?.building_id?.id])

  ////////////store/////////
  useEffect(() => {
    if (is_login) {
      dispatch(getProductAsync(token))
    }
  }, [dispatch, flagStore, is_login, token])
  //////////vote////////
  useEffect(() => {
    if (is_login) {
      dispatch(getVoteAsync(token))
    }
  }, [dispatch, flagVote, is_login, token])
  //////chat///////////


  chatSocket.onmessage = async (e) => {

    let data = JSON.parse(e.data)

    console.log(data)
    if (data.type === "user") {
      if (connect) {
        chatSocket.send(JSON.stringify({ "command": "new_user", "new_user": { "fullname": profile?.full_name, "img": profile?.profile_pic, "profile_id": profile?.id, "building_id": profile?.building_id?.id } }))
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
    if (pop && content[content.length - 1]?.profile_id?.full_name !== profile.full_name) {
      toast.info(`${content[content.length - 1]?.profile_id?.full_name} send a new message`, {
        position: "top-right", autoClose: 10000
      })
    }

  }, [content, content.length, pop, profile.full_name])

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
    dispatch(refreshAsync(localStorage.getItem("refresh") || sessionStorage.getItem("refresh") || ""))
  }, [dispatch])
  useEffect(() => {
    const token = localStorage.getItem("access") || sessionStorage.getItem("access") || ""
    if (is_login) {
      dispatch(getAsync(token))
      setTimeout(() => {
        dispatch(getAsyncbuilding({ token, "id": profile?.building_id?.id }))
      }, 1000)
    }
  }, [is_login, flag, dispatch, profile?.building_id?.id])
  useEffect(() => {
    if (is_login){
      setloder(true)
    setTimeout(() => {
      setloder(false)
    }, 2000)}
  }, [is_login])

  return (
    <NextThemesProvider>
      <NextUIProvider theme={color ? darkTheme : lightTheme}>
        <NavbarC />
        <br />
        <ToastContainer
          limit={4}
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
               {loder ?
          <Row justify='center' css={{p:'30%'}}>
            <Loading type="points" size='xl'/>
          </Row>:
        <Outlet />}
        <br />
        <br />
        <br />
        <FooterComponent />
      </NextUIProvider>
    </NextThemesProvider>

  );
}

export default App;
