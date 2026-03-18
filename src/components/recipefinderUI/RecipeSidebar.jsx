import { useEffect, useState } from "react";
import { SlidersHorizontal } from "lucide-react"
import RecipeCard from "./RecipeCard";
import { useSelector } from "react-redux";

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
      { label: "American", type: "area", value: "American" },
      { label: "Chinese", type: "area", value: "Chinese" },
      { label: "Thai", type: "area", value: "Thai" },
      { label: "Indian", type: "area", value: "Indian" },
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

  useEffect(() => {
    fetchRecipes(selectedFilter);
  }, [selectedFilter]);

  const fetchRecipes = async (filter) => {
    setLoading(true);

    let url =
      filter.type === "area"
        ? `https://www.themealdb.com/api/json/v1/1/filter.php?a=${filter.value}`
        : `https://www.themealdb.com/api/json/v1/1/filter.php?c=${filter.value}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      setRecipes(data.meals || []);
    } catch (error) {
      console.log(error);
      setRecipes([]);
    }

    setLoading(false);
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
                  onChange={() => setSelectedFilter(item)}
                  className=" hidden md:inline mr-2"
                />
                {item.label}
              </label>
            ))}
            </div>

          </div>
        ))}
      </div>

      {/* Recipes Section */}
      <div className="w-full md:w-3/4">
        {loading && <p>Loading recipes...</p>}

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))
          ) : (
            !loading && <p>No recipes found</p>
          )}
        </div>
      </div>

    </div>
  )
}
