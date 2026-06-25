import { useState, useEffect } from "react";
import AXIOS_API from "../../api/api";
import { Plus, X } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";


function RecipeForm({ onSaved }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: [{ name: "", quantity: "", unit: "" }],
    instructions: [""],
    cookingTime: "",
    cuisine: "",
    dietType: "Vegetarian",
    difficulty: "Easy",
    image: null,
  });

  

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchRecipe();
    }
  }, [id]);

 const fetchRecipe = async () => {
  try {
    const token = localStorage.getItem("token");

   

    const res = await AXIOS_API.get(
      `/api/recipes/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const recipe = res.data.recipe;

    setFormData({
      title: recipe.title,
      description: recipe.description,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      cuisine: recipe.cuisine,
      dietType: recipe.dietType,
      difficulty: recipe.difficulty,
      cookingTime: recipe.cookingTime,
      image: null,
    });
  } catch (error) {
    console.error(error);
  }
};



  const handleIngredientChange = (index, field, value) => {
    const updated = [...formData.ingredients];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setFormData({
      ...formData,
      ingredients: updated,
    });
  };

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [
        ...formData.ingredients,
        { name: "", quantity: "", unit: "" },
      ],
    });
  };

  const removeIngredient = (index) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter((_, i) => i !== index),
    });
  };

  const handleInstructionChange = (index, value) => {
    const updated = [...formData.instructions];
    updated[index] = value;

    setFormData({
      ...formData,
      instructions: updated,
    });
  };

  const addInstruction = () => {
    setFormData({
      ...formData,
      instructions: [...formData.instructions, ""],
    });
  };

  const removeInstruction = (index) => {
    setFormData({
      ...formData,
      instructions: formData.instructions.filter((_, i) => i !== index),
    });
  };

  const handleCancel = () => {
    
    setFormData({
      title: "",
      description: "",
      ingredients: [{ name: "", quantity: "", unit: "" }],
      instructions: [""],
      cookingTime: "",
      cuisine: "",
      dietType: "Vegetarian",
      difficulty: "Easy",
      image: null,
    });

    
    navigate(-1); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

     

      const submitData = new FormData();

      submitData.append("title", formData.title);
      submitData.append("description", formData.description);
      submitData.append("ingredients", JSON.stringify(formData.ingredients));
      submitData.append("instructions", JSON.stringify(formData.instructions));
      submitData.append("cookingTime", formData.cookingTime);
      submitData.append("cuisine", formData.cuisine);
      submitData.append("dietType", formData.dietType);
      submitData.append("difficulty", formData.difficulty);

      if (formData.image) {
        submitData.append("image", formData.image);
      }

     
      if (id) {
        await AXIOS_API.put(`/api/recipes/update/${id}`, submitData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Recipe updated successfully");
      } else {
        await AXIOS_API.post("/api/recipes/create", submitData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Recipe uploaded successfully");
      }
    

      setFormData({
        title: "",
        description: "",
        ingredients: [{ name: "", quantity: "", unit: "" }],
        instructions: [""],
        cookingTime: "",
        cuisine: "",
        dietType: "Vegetarian",
        difficulty: "Easy",
        image: null,
      });

      if (onSaved) {
        onSaved();
      }
    } catch (error) {
  console.log("FULL ERROR:", error);
  console.log("RESPONSE:", error.response);
  console.log("DATA:", error.response?.data);

  alert(error.response?.data?.message || "Failed to upload recipe");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 py-8 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm p-6 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-poppins font-bold text-orange-600">
            Upload Your Recipe
          </h1>
          <button onClick={handleCancel} className="text-gray-500 hover:text-red-500">Cancel</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block mb-2 text-sm text-gray-600">Title</label>
              <input
                type="text"
                name="title"
                placeholder="Recipe title"
                className="w-full font-poppins border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block font-poppins mb-2 text-sm text-gray-600">Cuisine</label>
              <input
                type="text"
                name="cuisine"
                placeholder="Indian"
                className="w-full font-poppins border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={formData.cuisine}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="block font-poppins mb-2 text-sm text-gray-600">Description</label>
            <textarea
              name="description"
              rows="5"
              placeholder="Describe your recipe..."
              className="w-full font-poppins border rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-5">
            <div>
              <label className="block font-poppins mb-2 text-sm text-gray-600">Diet Type</label>
              <select
                name="dietType"
                className="w-full font-poppins border rounded-lg px-4 py-3"
                value={formData.dietType}
                onChange={handleChange}
              >
                <option>Vegetarian</option>
                <option>Non Vegetarian</option>
                <option>Vegan</option>
                <option>Dessert</option>
                <option>Starter</option>
              </select>
            </div>

            <div>
              <label className="block font-poppins mb-2 text-sm text-gray-600">Difficulty</label>
              <select
                name="difficulty"
                className="w-full font-poppins border rounded-lg px-4 py-3"
                value={formData.difficulty}
                onChange={handleChange}
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>

            <div>
              <label className="block font-poppins mb-2 text-sm text-gray-600">Cooking Time (mins)</label>
              <input
                type="number"
                name="cookingTime"
                placeholder="30"
                className="w-full font-poppins border rounded-lg px-4 py-3"
                value={formData.cookingTime}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-8">
            <label className="block font-poppins mb-2 text-sm text-gray-600">Recipe Image</label>
            {formData.image && (
              <img
                src={URL.createObjectURL(formData.image)}
                alt="preview"
                className="w-full font-poppins h-64 object-cover rounded-xl mb-4"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  image: e.target.files[0],
                })
              }
              className="w-full"
            />
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-poppins text-gray-600 font-semibold">Ingredients</h2>
              <button
                type="button"
                onClick={addIngredient}
                className="flex font-poppins items-center gap-1 text-orange-500 font-medium"
              >
                <Plus size={18} />
                Add Ingredient
              </button>
            </div>

            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="grid grid-cols-[2fr_1fr_1fr_auto] gap-3 items-center mb-3">
                <input
                  type="text"
                  placeholder="Name"
                  value={ingredient.name}
                  onChange={(e) =>
                    handleIngredientChange(index, "name", e.target.value)
                  }
                  className="border font-poppins p-2 rounded-lg"
                />

                <input
                  type="text"
                  placeholder="Qty"
                  value={ingredient.quantity}
                  onChange={(e) =>
                    handleIngredientChange(index, "quantity", e.target.value)
                  }
                  className="border font-poppins p-2 rounded-lg"
                />

                <input
                  type="text"
                  placeholder="Unit"
                  value={ingredient.unit}
                  onChange={(e) =>
                    handleIngredientChange(index, "unit", e.target.value)
                  }
                  className="border font-poppins p-2 rounded-lg"
                />

                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className=" text-red-500  hover:text-red-700 font-medium"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-poppins text-gray-600 font-semibold">Instructions</h2>
              <button
                type="button"
                onClick={addInstruction}
                className="flex items-center gap-1 font-poppins text-orange-500 font-medium"
              >
                <Plus size={18} />
                Add Step
              </button>
            </div>
            {formData.instructions.map((instruction, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={instruction}
                  onChange={(e) =>
                    handleInstructionChange(index, e.target.value)
                  }
                  className="flex-1 border p-2 rounded-lg"
                  placeholder={`Step ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeInstruction(index)}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  <X size={18} />
                </button>
              </div>

            ))}
          </div>

          <button
            disabled={loading}
            className="w-full bg-orange-500 font-poppins hover:bg-orange-600 text-white font-semibold py-4 rounded-xl transition"
          >
            {loading ? "Uploading..." : "Upload Recipe"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RecipeForm;
