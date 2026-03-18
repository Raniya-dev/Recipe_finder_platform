
import { useState } from "react";
import RecipeCard from "./RecipeCard";
import { useSelector } from "react-redux";
import ChatBot from "./Chatbot";

function SearchBying() {

  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResult, setNoResult] = useState(false);

  const state = {
    theme: { isLight: true }
  }

  const isLight = useSelector((state) => {
    console.log(state);
    return state.theme.isLight
  })

  const handleSearch = async () => {

    if (!query.trim()) return;

    setLoading(true);
    setNoResult(false);

    try {

      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );

      const data = await response.json();

      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]);
        setNoResult(true);
      }

    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">

        <input
          type="text"
          placeholder="Search recipes by name or ingredient......"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className={` ${isLight?"text-slate-700":"bg-slate-700 text-white focus:ring-slate-500"} flex-1 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400`}
        />

        <button
          onClick={handleSearch}
          className="w-full sm:w-auto px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          Search
        </button>

      </div>


      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-500 text-lg mb-4">
          Loading recipes...
        </p>
      )}


      {/* No Result */}
      {noResult && (
        <p className="text-center text-red-500 text-lg font-semibold mb-4">
          No Recipes Found
        </p>
      )}


      {/* Recipe Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">

        {recipes.map((meal) => (
          <RecipeCard key={meal.idMeal} recipe={meal} />
        ))}

      </div >

      <div className=" mt-8">

      <ChatBot/>
      </div>


    </div>
  );
}





export default SearchBying

