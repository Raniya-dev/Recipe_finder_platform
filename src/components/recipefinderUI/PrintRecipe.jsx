import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AXIOS_API from "../../api/api";
import { Printer } from "lucide-react"
function PrintRecipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await AXIOS_API.get(
        `/api/recipes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setRecipe(res.data.recipe);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!recipe) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading Recipe...
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen py-10 px-4 print:bg-white">

      {/* Print Button */}
      <div className="max-w-4xl mx-auto flex justify-end mb-4 print:hidden">
        <button
          onClick={handlePrint}
          className="bg-orange-500 flex gap-2 items-center hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-semibold"
        >
          <Printer className="w-5 h-5  " />Print Recipe
        
        </button>
      </div>

      {/* Printable Area */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 print:shadow-none print:p-0">

        {/* Header */}
        <div className="border-b pb-6 mb-6">
          <h1 className="text-4xl font-bold text-gray-800 font-poppins text-center mb-2">
            {recipe.title}
          </h1>

          <p className="text-center font-poppins text-slate-600">
            {recipe.description}
          </p>
        </div>

        {/* Image */}
        {recipe.image && (
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-72 object-cover rounded-lg mb-6"
          />
        )}

        {/* Metadata */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

          <div className="bg-orange-50 rounded-lg font-poppins text-slate-700 p-4 text-center">
            <h3 className="font-semibold">Category</h3>
            <p>{recipe.category}</p>
          </div>

          <div className="bg-orange-50 rounded-lg font-poppins text-slate-700 p-4 text-center">
            <h3 className="font-semibold">Cuisine</h3>
            <p>{recipe.cuisine || "N/A"}</p>
          </div>

          <div className="bg-orange-50 rounded-lg font-poppins text-slate-700 p-4 text-center">
            <h3 className="font-semibold">Difficulty</h3>
            <p>{recipe.difficulty}</p>
          </div>

          <div className="bg-orange-50 rounded-lg font-poppins text-slate-700 p-4 text-center">
            <h3 className="font-semibold">Cooking Time</h3>
            <p>{recipe.cookingTime} mins</p>
          </div>

        </div>

        {/* Ingredients */}
        <div className="mb-8">
          <h2 className="text-2xl text-gray-800 font-poppins font-bold border-b pb-2 mb-4">
            Ingredients
          </h2>

          <ul className="space-y-2">
            {recipe.ingredients?.map((ingredient, index) => (
              <li
                key={index}
                className="flex font-poppins text-slate-700 items-center gap-2"
              >
                <span>☐</span>
                <span>
                  {ingredient.name}
                  {ingredient.quantity &&
                    ` - ${ingredient.quantity} ${ingredient.unit || ""}`}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div>
          <h2 className="text-2xl  text-gray-800 font-poppins font-bold border-b pb-2 mb-4">
            Instructions
          </h2>

          <ol className="space-y-4">
            {recipe.instructions?.map((step, index) => (
              <li
                key={index}
                className="flex gap-4 font-poppins text-slate-700 bg-slate-50 p-4 rounded-lg"
              >
                <span className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold shrink-0">
                  {index + 1}
                </span>

                <p>{step}</p>
              </li>
            ))}
          </ol>
        </div>

       
        <div className="mt-10 border-t pt-4 text-center text-sm text-slate-500">
          Printed from Recipe Finder • {new Date().toLocaleDateString()}
        </div>

      </div>
    </div>
  );
}

export default PrintRecipe;