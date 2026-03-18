import {Outlet} from 'react-router-dom'
import Navbar from '../components/recipefinderUI/Navbar'

import React from 'react'
import { useSelector } from 'react-redux'

function RootLayout() {

    const isLight = useSelector((state)=>{
        console.log(state);
        return state.theme.isLight
    })
  return (
   <>
   <Navbar className={isLight ? "bg-orange-50 border-slate-100 ":"bg-slate-900   border-slate-700" }/>

   <main className={isLight ? "bg-orange-50 min-h-screen w-full":"bg-slate-900 min-h-screen w-full"}>
    <div className="pb-16 md:pb-0">

    <Outlet/>
    </div>
   </main>
   
   </>
  )
}

export default RootLayout