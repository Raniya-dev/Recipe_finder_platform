import { useEffect, useState } from "react";
import { SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react"
import RecipeCard from "./RecipeCard";
import { useSelector } from "react-redux";

import AXIOS_API from "../../api/api";



const filtersSections = [
  {
    title: "MEAL TYPE",
    items: [
      { label: "Breakfast", type: "category", value: "Breakfast" },
      { label: "Starter", type: "category", value: "Starter" },
      { label: "Side", type: "category", value: "Side" },
      { label: "Vegan", type: "category", value: "Vegan" },
      { label: "Vegetarian", type: "category", value: "Vegetarian" },

    ],
  },
  {
    title: "NON-VEG",
    items: [
      { label: "Beef", type: "category", value: "Beef" },
      { label: "Chicken", type: "category", value: "Chicken" },
      { label: "Lamb", type: "category", value: "Lamb" },
      { label: "Goat", type: "category", value: "Goat" },
      { label: "Pork", type: "category", value: "Pork" },


    ],
  },

  {
    title: "CUISINE",
    items: [

      { label: "Chinese", type: "area", value: "Chinese" },
      { label: "Thai", type: "area", value: "Thai" },
      { label: "Indian", type: "area", value: "India" },
      { label: "Turkish", type: "area", value: "Turkish" },
      { label: "Saudi Arabian", type: "area", value: "Saudi Arabian" },
      { label: "Spanish", type: "area", value: "Spanish" },


    ],
  },

  {
    title: "A PIECE OF SWEET",
    items: [
      { label: "Dessert", type: "category", value: "Dessert" }
    ]
  }

];

export default function RecipeSidebar() {
  const [selectedFilter, setSelectedFilter] = useState(filtersSections[0].items[0]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1)

  const [maxTime, setMaxTime] = useState(60);


  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);

        const res = await AXIOS_API.get(
          `/api/mealdb/recipe/search?type=${selectedFilter.type}&value=${selectedFilter.value}&maxTime=${maxTime}&page=${page}&limit=6`
        );

        setRecipes(res.data.recipes || []);
        setTotalPages(res.data.totalPages || 1);

      } catch (error) {
        console.log(error);
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [selectedFilter, maxTime, page]);



  const handleMaxTimeChange = (e) => {
    setMaxTime(e.target.value);
    setPage(1);
  };


  const state = {
    theme: { isLight: true }
  }

  const isLight = useSelector((state) => {
    console.log(state);
    return state.theme.isLight
  })


  return (
    <div className="flex flex-col md:flex-row gap-7 md:gap-6 px-4 md:px-8 ">

      {/* Sidebar */}
      <div className={`
    md:sticky md:top-20
    md:h-screen md:w-1/4
    
    overflow-x-auto md:overflow-y-auto
    flex md:block gap-4 md:gap-0
    
    p-4 md:p-6 rounded-md
    ${isLight ? "bg-white text-slate-700" : "bg-slate-800 text-white"}
    shadow
  `} >
        <h2 className=" text-sm md:text-base lg-text-lg  font-semibold flex gap-2 mb-5">
          <SlidersHorizontal className="text-orange-600 w-6 h-6" />
          Refined Search
        </h2>

        {filtersSections.map((section) => (
          <div key={section.title} className="min-w-max md:min-w-0 mb-0 md:mb-6">
            <h3 className=" hidden md:block font-semibold  font-mono text-md mb-3">
              {section.title}
            </h3>

            <div className="flex md:block gap-3">

              {section.items.map((item) => (
                <label key={item.label} className={` whitespace-nowrap  text-sm px-3 py-1 rounded-full ${isLight ? "bg-orange-100 text-slate-700" : "bg-slate-500 text-white"} md:bg-transparent block mb-2 cursor-pointer hover:text-orange-600 font-poppins`}>
                  <input
                    type="radio"
                    name="recipeFilter"
                    checked={selectedFilter?.label === item.label}
                    onChange={() => {
                      setSelectedFilter(item)
                      setPage(1)
                    }
                    }
                    className=" hidden md:inline mr-2"
                  />
                  {item.label}
                </label>
              ))}
            </div>

          </div>
        ))}
        <div className="mt-4">
          <h3 className="font-semibold mb-2">
            Cooking Time: {maxTime} mins
          </h3>

          <input
            type="range"
            min="10"
            max="65"
            step="5"
            value={maxTime}
            onChange={handleMaxTimeChange}
            className="w-full accent-orange-600"
          />
        </div>
      </div>

      {/* Recipes Section */}
      <div className="w-full md:w-3/4">
        {loading && <p>Loading recipes...</p>}

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <RecipeCard key={recipe._id || recipe.idMeal || recipe.id} recipe={recipe} />
            ))
          ) : (
            !loading && <p className="text-orange-600">No recipes found</p>
          )}
        </div>
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
      </div>


    </div>
  )
}
