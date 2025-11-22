import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import NotFoundPage from './components/NotFoundPage.jsx'
import ClickedCities from './components/ClickedCities.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import store from './redux/store'
import { Provider } from 'react-redux'
import { FavoriteWeather } from './components/FavoriteWeather.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/:cityName",
    element: <ClickedCities />,
  },
  {
    path: "/favorites",
    element: <FavoriteWeather />,
  }


]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>


)
