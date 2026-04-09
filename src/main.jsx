import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom' //세부 페이지 관련
import { Provider } from 'react-redux' //나의 App이 Redux.store에 접근할수있게 해줌
import store from './store.js' // Redux.store의 로컬 위치
import ReactDOM from "react-dom/client";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />    
      </BrowserRouter>
    </Provider>

  </StrictMode>,
)

// vite-plugin-pwa: 서비스 워커 등록
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}