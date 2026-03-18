import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

import { toggleFavorite } from "../../redux/features/favouriteSlice";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export default function RecipeCard({ recipe }) {

  const dispatch=useDispatch();
  const favorites=useSelector(state=> state.favorites.items)

  const isLiked = favorites.some(
    item=>item.idMeal === recipe.idMeal
  );

  const handlelike = ()=>{
    dispatch(toggleFavorite(recipe))
  }

 

 

  const state = {
    theme: { isLight: true }
  }

  const isLight = useSelector((state) => {
    console.log(state);
    return state.theme.isLight
  })
  return (
    <div className={`${isLight?"bg-white text-slate-500":"bg-slate-800 text-white"} rounded-lg shadow-md transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-105 duration-300  `}>
      <div className="relative">

      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="object-cover w-full rounded-lg mb-3"
      />

        <div className="absolute top-3 right-3 bg-black/50 p-2 rounded-full">
          <Heart onClick={handlelike} className={`text-white cursor-pointer w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : "text-white"}`} />
        </div>

      
      </div>
      <div className="flex flex-col justify-center ">

      <h3 className="font-semibold font-mono text-center mb-2">{recipe.strMeal}</h3>
      <Link
        to={`/recipe/${recipe.idMeal}`}
        className="text-orange-500  text-center font-medium m-4"
      ><button className='text-white font-mono bg-orange-400  p-2 rounded-md mb-2 '>

        Try me Out!
      </button>
      </Link>
      </div>

    </div>
  );
}