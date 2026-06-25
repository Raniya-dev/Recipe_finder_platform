
import RecipeCard from "./RecipeCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFavorites } from "../../redux/features/favouriteSlice";
import AXIOS_API from "../../api/api";


export default function Saved() {

  const favorites = useSelector(
    state => state.favorites.items
  );

  const dispatch = useDispatch();

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await AXIOS_API.get(
        "/api/recipes/getfavorite",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      dispatch(
        setFavorites(
          res.data.map(fav => fav.recipeId)
        )
      );

    } catch (error) {
      console.error(error);
    }
  };

  return (

    <div className="p-8">

      <h1 className="text-3xl font-poppins text-slate-500 text-center font-bold mb-6">
        Saved Recipes
      </h1>

      {favorites.length === 0 ? (
        <p className="text-center text-slate-500 font-poppins text-md">No saved recipes yet</p>
      ) : (

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {favorites.map(recipe => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
            />
          ))}

        </div>

      )}

    </div>

  );
}
