import React from 'react'
// import ReactDOM from 'react-dom/client'
import { createRoot } from 'react-dom/client'
import GlobalStyles from './styles/GlobalStyles'
import App from './App.tsx'
import './index.css'
import { RecoilRoot } from "recoil";

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  // <React.StrictMode>
  <RecoilRoot>
    <GlobalStyles />
    <App />
  </RecoilRoot>
  // </React.StrictMode>,
)