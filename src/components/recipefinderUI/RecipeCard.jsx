import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

import { toggleFavorite } from "../../redux/features/favouriteSlice";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import AXIOS_API from "../../api/api";

export default function RecipeCard({ recipe }) {

  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.items)

  const isLiked = favorites.some(
    item => item._id === recipe._id
  );

const handlelike = async () => {
  try {
    const token = localStorage.getItem("token");

    await AXIOS_API.post(
      "/api/recipes/favorite",
      { recipeId: recipe._id },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    dispatch(toggleFavorite(recipe));

  } catch (error) {
    console.error(error);
  }
};

  

 





  const state = {
    theme: { isLight: true }
  }

  const isLight = useSelector((state) => {
    console.log(state);
    return state.theme.isLight
  })

  console.log(recipe)
  return (
    <div className={`${isLight ? "bg-white text-slate-500" : "bg-slate-800 text-white"} rounded-lg shadow-md transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-105 duration-300  `}>
      <div className="relative">

        <img
          src={recipe.image}
          alt={recipe.title}
          className="object-cover w-full rounded-lg mb-3"
        />

        <div className="absolute top-3 right-3 bg-black/50 p-2 rounded-full">
          <Heart
            fill={isLiked ? "red" : "none"}
            className={`w-4 h-4 cursor-pointer ${isLiked ? "text-red-500" : "text-white"
              }`}
            onClick={handlelike}
          />
        </div>


      </div>
      <div className="flex flex-col justify-center ">

        <h3 className="font-semibold font-mono text-center ">{recipe.title}</h3>
        <Link
          to={`/recipe/${recipe._id}`}
          className="text-orange-500  text-center font-medium m-4"
        >

          <p className='text-yellow-600 font-serif mb-2 '>{recipe.description}</p>
          <p className='text-orange-600 font-serif'> Difficulty Level: {recipe.difficulty}</p>
          <p className='text-orange-500 text-md font-mono font-bold mb-2 p-2'> 🕑Cooking Time: {recipe.cookingTime}mins</p>


          <button className='text-white font-mono bg-orange-400  p-2 rounded-md mb-2 '>

            Try me Out!
          </button>
        </Link>
      </div>

    </div>
  );
}