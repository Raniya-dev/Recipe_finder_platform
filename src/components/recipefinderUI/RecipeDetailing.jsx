import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AXIOS_API from "../../api/api";
import { useNavigate} from "react-router-dom"

function RecipeDetails() {

    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const navigate = useNavigate();
    const [checked, setChecked] = useState([]);



    const state = {
        theme: { isLight: true }
    }

    const isLight = useSelector((state) => {
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
        const fetchAllRecipe = async () => {
            try {
                const res = await AXIOS_API.get(`/api/mealdb/recipe/${id}`);
                console.log(res.data);
                console.log("hey hellooo i am fetching function..");

                console.log(res.data.recipe);
                setRecipe(res.data.recipe);
            } catch (error) {
                console.error("Error in fetching recipe details:", error);
            }
        };
        fetchAllRecipe();
    }, [id]);

    if (!recipe) {
        return <p className="text-center mt-10">Loading...</p>;
    }







    return (
        <div className=" p-4 md:p-6 flex flex-col md:flex-row gap-8 md:gap-12">

            <div className="w-full md:w-1/2">

                {/* Image */}
                <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-80 md:h-96 object-cover rounded-xl mb-6 md:sticky md:top-20"
                />

                <p className="text-lg font-medium text-orange-400">
                    {recipe.description}
                </p>




                {recipe?.youtubeLink && (
                    <div className="mt-4">
                        <h3
                            className={`text-xl mb-2 font-poppins font-semibold ${isLight ? "text-slate-600" : "text-slate-400"
                                }`}
                        >
                            Watch Tutorial
                        </h3>

                        <iframe
                            width="100%"
                            height="400"
                            src={recipe.youtubeLink.replace(
                                "watch?v=",
                                "embed/"
                            )}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                )}
            </div>

            <div className="w-full md:w-1/2 flex flex-col gap-6">

                {/* Title */}
                <h1 className={`text-3xl md:text-5xl ${isLight ? "text-slate-600" : "text-orange-600"}  font-poppins font-bold mb-5`}>
                    {recipe.title}
                </h1>

                {/* Ingredients */}


                <h2 className={`  ${isLight ? "text-slate-600" : "text-slate-400"} text-xl font-poppins font-semibold mb-3`}>Ingredients</h2>

                <div className="space-y-3 ">

                    {recipe.ingredients.map((item, i) => (

                        <label
                            key={i}
                            className={`${isLight
                                ? "bg-white text-slate-700"
                                : "bg-slate-800 text-orange-300"
                                } flex items-center gap-4 p-3 md:p-4 rounded-xl font-mono shadow-sm cursor-pointer`}
                        >

                            <input
                                type="checkbox"
                                checked={checked.includes(i)}
                                onChange={() => toggleCheck(i)}
                                className="w-5 h-5 accent-orange-500 cursor-pointer"
                            />

                            <span>
                                {item.quantity} {item.unit} {item.name}
                            </span>

                        </label>

                    ))}

                </div>

                <h2 className={` ${isLight ? "text-slate-600" : "text-slate-400"} text-xl font-poppins font-semibold mb-3`}>Instructions</h2>

                <div className="space-y-4">
                    {recipe.instructions
                        .filter(step => step?.trim().length > 10)
                        .map((step, index) => (
                            <div
                                key={index}
                                className={`${isLight
                                    ? "bg-white text-slate-700"
                                    : "bg-slate-800 text-orange-300"
                                    } flex gap-4 p-4 md:p-7 rounded-xl shadow-sm`}
                            >
                                <span className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold shrink-0">
                                    {index + 1}
                                </span>

                                <p className="font-mono">{step.trim()}</p>
                            </div>
                        ))}
                </div>

            </div>
            

            <button
                onClick={() => navigate(`/printrecipe/${id}`)}
                className="fixed bottom-3 right-3 bg-orange-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-orange-600 transition duration-300"
            >
                Print Recipe
            </button>












        </div>
    );
}

export default RecipeDetails;