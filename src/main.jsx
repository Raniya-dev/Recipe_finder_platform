

import { Provider } from 'react-redux'
import { store } from './redux/store.js'

import { StrictMode } from 'react'

import './index.css'

import ReactDOM from "react-dom/client"
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import RootLayout from './layout/RootLayout.jsx'
import Home from './components/recipefinderUI/Home.jsx'
import SearchBying from './components/recipefinderUI/SearchBying.JSX'
import RecipeDetailing from './components/recipefinderUI/RecipeDetailing.jsx'
import Saved from './components/recipefinderUI/Saved.jsx'
import Chatbot from './components/recipefinderUI/Chatbot.jsx'




const router = createBrowserRouter([
  {
    path:"/",
    element:<RootLayout/>,

    children:[
      {index:true,element:<Home/>},
        {
        path: "/searchByIngredient",
        element: <SearchBying />
      },
      {
         path:"/recipe/:id",
          element:<RecipeDetailing />
      },
      {
        path:"/Saved",
        element:<Saved/>
      },
      {
        path:"/chatbot",
        element:<Chatbot/>
      }
     
    ]
    
  }
],
{
  basename:"/Recipe_finder_platform/"
}

)

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store = {store}>

      <RouterProvider router={router}/>

    </Provider>
   
  </StrictMode>
)
