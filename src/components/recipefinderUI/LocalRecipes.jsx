import { useEffect, useState } from 'react';
import AXIOS_API from '../../api/api';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function LocalRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // const [selectedRecipe, setSelectedRecipe] = useState(null);
  // const [showForm, setShowForm] = useState(false);
  const isLight = useSelector((state) => state.theme?.isLight ?? true);

  const token = localStorage.getItem('token');
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  const fetchRecipes = async () => {
    setLoading(true);
    setError('');

    if (!token) {
      setError('Please login to manage your recipes.');
      setLoading(false);
      return;
    }

    try {
      const res = await AXIOS_API.get('/api/recipes?mine=true', {
        headers: authHeaders,
      });
      setRecipes(res.data.recipes || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load recipes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this recipe?')) return;

    try {
      await AXIOS_API.delete(`/api/recipes/delete/${id}`, {
        headers: authHeaders,
      });
      setRecipes((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to delete recipe.');
    }
  };

  // const handleEdit = (recipe) => {
  //   setSelectedRecipe(recipe);
  //   setShowForm(true);
  // };

  // const handleCreate = () => {
  //   setSelectedRecipe(null);
  //   setShowForm(true);
  // };

  // const handleSaved = () => {
  //   setShowForm(false);
  //   setSelectedRecipe(null);
  //   fetchRecipes();
  // };

  if (!token) {
    return (
      <div className={`min-h-screen p-8 ${isLight ? 'bg-orange-100' : 'bg-slate-900'} text-slate-800`}>
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-orange-600 mb-4">Local Recipe Manager</h1>
          <p className="text-slate-600 mb-6">You need to login to create, edit, or delete your recipes.</p>
          <Link to="/Login" className="inline-block bg-orange-500 text-white px-6 py-3 rounded-xl">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`${isLight ? 'bg-orange-50' : 'bg-slate-900'} min-h-screen py-12 px-4 md:px-8`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
          <div>
            <h1 className={`text-3xl font-poppins font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              My Recipes
            </h1>
            <p className="text-orange-500 font-poppins mt-2">Try my recipes!</p>
          </div>
          <Link
            to="/addrecipe"
            className="
  inline-flex items-center justify-center
  rounded-full
  bg-orange-500
  text-white font-poppins
  px-6 py-3
  font-semibold
  hover:bg-orange-600
  "
          >
            + Add Your Recipe
          </Link>
        </div>

        {/* {showForm && (
          <RecipeForm recipe={selectedRecipe} onCancel={() => setShowForm(false)} onSaved={handleSaved} />
        )} */}

        {loading && <p className="text-slate-500">Loading recipes...</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {!loading && recipes.length === 0 && (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              No Recipes Yet
            </h3>

            <p className="text-gray-500 font-poppins">
              Click the
              button above to share your first delicious recipe.
            </p>
          </div>
        )}

        <div className="grid gap-6 mt-6 md:grid-cols-2">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className={`group overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${isLight ? "bg-white" : "bg-slate-800"
                }`}
            >
              {/* Recipe Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={recipe.image || "/placeholder-food.jpg"}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute top-4 right-4">
                  <span className="bg-white/90  backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-orange-600">
                    {recipe.difficulty}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 text-white">
                  <h2 className="text-2xl font-poppins font-bold">
                    {recipe.title}
                  </h2>

                  <p className="text-sm font-poppins opacity-90">
                    {recipe.cuisine}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">

                <p className="text-orange-500 font-poppins line-clamp-3 mb-5">
                  {recipe.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">

                  <span className="bg-green-100 font-sans text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                    😉 {recipe.dietType}
                  </span>

                  <span className="bg-orange-100 font-sans text-orange-700 px-3 py-1 rounded-full text-xs font-semibold">
                    ⏱ {recipe.cookingTime} mins
                  </span>

                </div>

                {/* Buttons */}
                <div className="flex gap-3">

                  <Link
                    to={`/userrecipe/${recipe._id}`}
                    className="flex-1 font-poppins bg-pink-600 text-white py-2 rounded-xl text-center hover:bg-pink-500 transition"
                  >
                    View
                  </Link>

                  <Link
                    to={`/editrecipe/${recipe._id}`}
                    className=" flex-1 bg-orange-600 font-poppins text-white py-2 rounded-xl text-center hover:bg-orange-500"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(recipe._id)}
                    className="flex-1 font-poppins bg-red-600 text-white py-2 rounded-xl hover:bg-red-500 transition"
                  >
                    Delete
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



