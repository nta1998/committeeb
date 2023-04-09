import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './component/Home'
import Ads from './component/Ads'
import Chat from './component/Chat'
import Vote from './component/Vote'
import StoreC from './component/StoreC'
import ProfileC from './component/ProfileC'
import Cart from './component/Cart'
import { store } from './app/store'
import App from './App'
import Committee from './component/Committee'
import Singup from './component/Singup'

import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";                                         


const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/singup/31214/:id/312" element={<Singup />} />
          <Route path="" element={<App />}>
            <Route path="/Home" element={<Home />} />
            <Route path="/Ads" element={<Ads />} />
            <Route path="/Chat" element={<Chat />} />
            <Route path="/vote" element={<Vote />} />
            <Route path="/Store" element={<StoreC />} />
            <Route path="/Profile" element={<ProfileC />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin" element={<Committee />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
