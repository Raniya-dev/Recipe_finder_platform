import { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import { useSelector } from "react-redux";
import ChatBot from "./Chatbot";
import AXIOS_API from "../../api/api";
import { ChevronLeft, ChevronRight } from "lucide-react"


function SearchBying() {

  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1)

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
      const response = await AXIOS_API.get(
        `/api/recipes/searchbyrecipe?q=${query}&page=${page}&limit=6`
      );

      const data = response.data;
      setTotalPages(data.totalPages || 1);

      if (data?.recipes?.length > 0) {
        setRecipes(data.recipes);
      } else {
        setRecipes([]);
        setNoResult(true);
      }

    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {
  if (query.trim()) {
    handleSearch();
  }
}, [page]);

const startSearch = () => {
  setPage(1);
  handleSearch();
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
          className={` ${isLight ? "text-slate-700" : "bg-slate-700 text-white focus:ring-slate-500"} flex-1 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400`}
        />

        <button
          onClick={startSearch}
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

        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}


      </div >
        <div className="flex justify-center items-center gap-4 mt-8 mb-10">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-orange-400 text-white rounded-full disabled:opacity-50"
          >
            <ChevronLeft className="text-white w-3 h-3" />
          </button>

          <span className={`text-sm ${isLight ? "text-slate-700 font-mono" : "text-slate-300 font-mono"}`}>
            Page {page}/{totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-orange-400 text-white rounded-full disabled:opacity-50"
          >
            <ChevronRight className="text-white  w-3 h-3 rounded" />
          </button>
        </div>

      <div className=" mt-8">

        <ChatBot />
      </div>


    </div>
  );
}





export default SearchBying

