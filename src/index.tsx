import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { store } from './services/store'
import './index.css'
import { App } from './components/app/app'
import reportWebVitals from './reportWebVitals'

const isProduction = process.env.NODE_ENV === 'production';
const Router: typeof HashRouter = isProduction ? HashRouter : BrowserRouter
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTI0Mzc0MmRhZDYzMDAxYTQwYTZkNiIsImlhdCI6MTYyODAzMzA4OSwiZXhwIjoxNjI4MDM0Mjg5fQ.l8o3nNgU0MlCF_i7HL9Ov6Ba6_frWoAHGLdTrLIExBc
// 551cc1a644daa0f46bb3ffc3eac23f0219976ba5f6215728dc032ef64946a4a08dac9f3c87236c30

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
