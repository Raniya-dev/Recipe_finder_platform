import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function RecipeDetails() {

    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [checked, setChecked] = useState([]);

          const state = {
    theme:{isLight : true}
}

const isLight = useSelector((state)=>{
    console.log(state);
    return state.theme.isLight
})

    const toggleCheck = (index) => {
        if (checked.includes(index)) {
            setChecked(checked.filter((i) => i !== index));
        } else {
            setChecked([...checked, index]);
        }
    };

    useEffect(() => {

        const fetchRecipe = async () => {

            const res = await fetch(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
            );

            const data = await res.json();
            setRecipe(data.meals[0]);
        };

        fetchRecipe();

    }, [id]);

    if (!recipe) {
        return <p className="text-center mt-10">Loading...</p>;
    }







    return (
        <div className=" p-4 md:p-6 flex flex-col md:flex-row gap-8 md:gap-12">

            <div className="w-full md:w-1/2">

                {/* Image */}
                <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="w-full h-80 md:h-96 object-cover rounded-xl mb-6 md:sticky md:top-20"
                />
            </div>

            <div className="w-full md:w-1/2 flex flex-col gap-6">

                {/* Title */}
                <h1 className={`text-3xl md:text-5xl ${isLight?"text-slate-600":"text-orange-600"}  font-poppins font-bold mb-5`}>
                    {recipe.strMeal}
                </h1>

                {/* Ingredients */}


                <h2 className={`  ${isLight ? "text-slate-600":"text-slate-400"} text-xl font-poppins font-semibold mb-3`}>Ingredients</h2>

                <div className="space-y-3 ">

                    {Array.from({ length: 20 }).map((_, i) => {

                        const ingredient = recipe[`strIngredient${i + 1}`];
                        const measure = recipe[`strMeasure${i + 1}`];

                        if (!ingredient || ingredient.trim() === "") return null;

                        return (

                            <label
                                key={i}
                                className={` ${isLight ? "bg-white text-slate-700":"bg-slate-800 text-orange-300"} flex items-center gap-4  p-3 md:p-4 rounded-xl font-mono shadow-sm cursor-pointer`}
                            >

                                <input
                                    type="checkbox"
                                    checked={checked.includes(i)}
                                    onChange={() => toggleCheck(i)}
                                    className="w-5 h-5 accent-orange-500 cursor-pointer"
                                />

                                <span className="">
                                    {measure} {ingredient}
                                </span>

                            </label>

                        );
                    })}

                </div>

                <h2 className={` ${isLight ? "text-slate-600":"text-slate-400"} text-xl font-poppins font-semibold mb-3`}>Instructions</h2>

                <div className="space-y-4">

                    {recipe.strInstructions
                        .split(".")
                        .filter(step => step.trim() !== "" && isNaN(step)) 
                        .filter(step => step.length > 2)
                        .map((step, index) => (

                            <div
                                key={index}
                                className={`${isLight ? "bg-white text-slate-700":"bg-slate-800 text-orange-300"} flex gap-4 p-4  md:p-7 rounded-xl shadow-sm`}
                            >

                                <div className="flex items-center justify-center w-8 h-8 p-2 bg-orange-400 text-white rounded-lg font-semibold">
                                    {index + 1}
                                </div>

                                <p className={` font-mono`}>
                                    {step.trim()}
                                </p>

                            </div>

                        ))}

                </div>

            </div>









        </div>
    );
}

export default RecipeDetails;