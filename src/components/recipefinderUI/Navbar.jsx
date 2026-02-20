
function Navbar(){
function handleClick(){
    alert("yes you hav clickced...")
}

    return(
        <nav className="sticky top-0 bg-orange-50 border-b border-indigo-100">
           <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
            <>
           

            <h1 className=" flex items-center gap-1 text-xl font-semibold text-yellow-600">  <img className="w-14 h-14 rounded-full shadow-slate-100" src="/forkimage.webp" alt="logo" />
            <span>TasteShare</span>
            </h1>
            </>
            <ul className="hidden md:flex gap-8 text-sm">

                <li className="hover:text-orange-600 cursor-pointer transition" >Home</li>
                <li className="hover:text-orange-600 cursor-pointer transition"> AI assistant</li>
                <li className="hover:text-orange-600 cursor-pointer transition">Saved</li>
                <li className="hover:text-orange-600  cursor-pointer transition">Explore</li>
                <li className="hover:text-orange-600 cursor-pointer transition">Toggle</li>
            </ul>
            <div className="flex items-center gap-3" >
                <button 
                onClick={handleClick}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-orange-600  transition">Login</button>
                <button
                onClick={()=>{alert("you have clicked signup function..")}}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-orange-600  transition">Signup</button>
            </div>
           </div>
           

        </nav>
    )
}

export default Navbar