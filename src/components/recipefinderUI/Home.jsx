import React from 'react'
import { useSelector } from 'react-redux';

import RecipeSidebar from './RecipeSidebar';
import { Link } from 'react-router-dom';



function Home() {

  const state = {
    theme: { isLight: true }
  }

  const isLight = useSelector((state) => {
    console.log(state);
    return state.theme.isLight
  })




  return (
    <div>

      <div className="h-auto flex items-start justify-center pt-6 mb-5  md:pt-10 pb-10 ">

        <div className={`w-full max-w-5xl ${isLight ? "bg-white" : "bg-slate-800"} rounded-2xl overflow-hidden flex flex-col md:flex-row `}>
          {/* leftside */}
          <div className=' md:w-1/2 p-6 md:p-8 flex flex-col space-y-4 md:space-y-5'>
            <span className=' w-4/6 p-2 text-orange-400 bg-orange-300/20 backdrop-blur-md text-sm rounded-xl text-center '>
              🔥TRENDING COMMUNITY RECIPES

            </span>
            <span className={`text-4xl md:text-7xl font-bold font-sans ${isLight ? "text-slate-900" : "text-white"} `}>Discover</span>
            <span className='text-4xl md:text-7xl font-bold font-sans text-orange-600'>Delicious</span>
            <span className={`text-4xl md:text-7xl font-bold font-sans ${isLight ? "text-slate-900" : "text-white"}`}>Recipes &</span>
            <span className={`text-4xl md:text-7xl font-bold font-sans ${isLight ? "text-slate-900" : "text-white"} mb-4`}>Share</span>
            <p className={`text-md mb-5 ${isLight ? "text-slate-800" : "text-white"}`}>
              Join 10k+ food enthusiasts sharing their secret <br /> ingredients and culinary stories from all around the <br /> world.
            </p>
            <Link to={"/searchByIngredient"}>
            
            <button className='text-white bg-orange-400 p-3 w-2/4 rounded-xl '>What's in ur Fridge?</button>
            </Link>


          </div>
          {/* Rightside of hero Section */}
          <div className=' hidden md:block  md:w-1/2'>
            <img className='w-full h-full object-cover' src="./bgimage.png" alt="" />

          </div>



        </div>


      </div>
    <RecipeSidebar/>
    </div>
  )
}

export default Home
