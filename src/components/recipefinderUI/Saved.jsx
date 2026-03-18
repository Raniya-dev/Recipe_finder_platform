import { useSelector } from "react-redux";
import RecipeCard from "./RecipeCard";

export default function Saved() {

  const favorites = useSelector(
    state => state.favorites.items
  );

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
              key={recipe.idMeal}
              recipe={recipe}
            />
          ))}

        </div>

      )}

    </div>

  );
}
