import { Pizza, HomeIcon, Bookmark, Sun, Moon,LogIn ,LogOut,ChefHat} from "lucide-react"
import { useSelector, useDispatch } from "react-redux"
import { toggleTheme } from "../../redux/features/themeSlice"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

function Navbar({ className }) {


    const state = {
        theme: { isLight: true }
    }

    const isLight = useSelector((state) => {
        console.log(state);
        return state.theme.isLight
    })

    const dispatch = useDispatch()

        const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const handleLogout =() =>{
        localStorage.removeItem("token")
        navigate("/login",{replace:true})
    }

    return (
    <nav className={`
  fixed bottom-0 left-0 w-full z-50
  bg-orange-50 border-t border-indigo-100 font-poppins font-medium
  lg:sticky lg:top-0 lg:bottom-auto lg:border-t-0 lg:border-b
  ${className}
`}>

  <div className="max-w-7xl mx-auto px-4 py-2 md:px-8 md:py-4">

    {/* Desktop Navbar */}
    <div className="hidden md:flex items-center justify-between">
      
      <h1 className={`flex items-center gap-2 text-xl font-semibold ${isLight ? "text-black" : "text-white"}`}>
        <img className="w-10 h-10 rounded-full" src="./orgforkandspoon.jpg" alt="logo" />
        <span>TasteShare</span>
      </h1>

      <ul className="flex gap-8 text-sm">
        <Link to={"/"}>
          <li className={`flex gap-1 transition ${isLight ? "text-slate-700 hover:text-orange-600" : "text-slate-300 hover:text-orange-600"} cursor-pointer`}>
            <HomeIcon className="w-5 h-5" /> Home
          </li>
        </Link>

        <Link to={"/Saved"}>
          <li className={`flex gap-1 transition ${isLight ? "text-slate-700 hover:text-orange-600" : "text-slate-300 hover:text-orange-600"} cursor-pointer`}>
            <Bookmark className="w-5 h-5" /> Saved
          </li>
        </Link>

        <Link to={"/recipes"}>
          <li className={`flex gap-1 transition ${isLight ? "text-slate-700 hover:text-orange-600" : "text-slate-300 hover:text-orange-600"} cursor-pointer`}>
            <ChefHat className="w-5 h-5" /> MyKitchen
          </li>
        </Link>

        
       {/* <Link to={"/mykitchen"}>
        <div className={`flex gap-1 transition duration-150 active:scale-90 ${isLight ? "text-slate-700 active:text-orange-600" : "text-slate-300 active:text-orange-600"} `}>
          <ChefHat className="w-5 h-5" />
          <span>My Kitchen</span>
        </div>
      </Link> */}

        {token ?(
          <button onClick={handleLogout} className={`flex gap-1 transition ${isLight ? "text-slate-700 hover:text-orange-600" : "text-slate-300 hover:text-orange-600"} cursor-pointer`}>
            <LogOut className="w-5 h-5" /> Logout
          </button>
        ):(
          <>
           <Link to={"/Login"}>
          <li className={`flex gap-1 transition ${isLight ? "text-slate-700 hover:text-orange-600" : "text-slate-300 hover:text-orange-600"} cursor-pointer`}>
            <LogIn className="w-5 h-5" /> Login
          </li>
        </Link>
        
          
          </>

        )}

   
        

        <li onClick={() => dispatch(toggleTheme())} className={`cursor-pointer transition ${isLight ? "text-slate-700 hover:text-orange-600" : "text-slate-300 hover:text-orange-600"} `}>
          {isLight ? <Sun /> : <Moon />}
        </li>
      </ul>

    </div>

    {/* Mobile / Tablet Bottom Navbar */}
    <div className="flex md:hidden justify-around items-center">
      
      <Link to={"/"}>
        <div className={`flex flex-col items-center  text-xs transition duration-150 active:scale-90 ${isLight ? "text-slate-700 active:text-orange-600" : "text-slate-300 active:text-orange-600"} `}>
          <HomeIcon className="w-5 h-5" />
          <span>Home</span>
        </div>
      </Link>

      <Link to={"/Saved"}>
        <div className={`flex flex-col items-center text-xs transition duration-150 active:scale-90 ${isLight ? "text-slate-700 active:text-orange-600" : "text-slate-300 active:text-orange-600"} `}>
          <Bookmark className="w-5 h-5" />
          <span>Saved</span>
        </div>
      </Link>

      <Link to={"/recipes"}>
        <div className={`flex flex-col items-center text-xs transition duration-150 active:scale-90 ${isLight ? "text-slate-700 active:text-orange-600" : "text-slate-300 active:text-orange-600"} `}>
          <ChefHat className="w-5 h-5" />
          <span>Recipes</span>
        </div>
      </Link>

       {/* <Link to={"/mykitchen"}>
        <div className={`flex flex-col items-center text-xs transition duration-150 active:scale-90 ${isLight ? "text-slate-700 active:text-orange-600" : "text-slate-300 active:text-orange-600"} `}>
          <ChefHat className="w-5 h-5" />
          <span>My Kitchen</span>
        </div>
      </Link> */}

      <div
        onClick={() => dispatch(toggleTheme())}
        className={`flex flex-col items-center text-xs cursor-pointer transition duration-150 active:scale-90 ${isLight ? "text-slate-700 active:text-orange-600" : "text-slate-300 active:text-orange-600"} `}
      >
        {isLight ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        <span>Theme</span>
      </div>

    </div>

  </div>
</nav>
    )
}

export default Navbar