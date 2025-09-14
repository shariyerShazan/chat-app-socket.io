import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { Routes } from './routes/Routes'
import { ToastContainer } from 'react-toastify'
import { PersistGate } from 'redux-persist/integration/react'
import {persistStore} from "redux-persist";
import { Provider } from 'react-redux'
import store from './redux/reduxStore'
import OnlineListener from './hooks/useGetOnlineUsers'

let persist = persistStore(store)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
        <PersistGate  loading={null} persistor={persist}>
              <RouterProvider router={Routes} />
              <ToastContainer />
              <OnlineListener />
        </PersistGate>
    </Provider>

  </StrictMode>,
)
