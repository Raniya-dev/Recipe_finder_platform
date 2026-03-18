import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice(
    {
        name:"theme",
        initialState:{isLight : true},

        reducers : {
            toggleTheme : (state) =>{
                console.log("hey i am here");
                
                // state.isLight = state.isLight ? false : true
                console.log("going to change to : ",!state.isLight);
                state.isLight = !state.isLight


            }
        }
    }
)

export const{toggleTheme} = themeSlice.actions
export default themeSlice.reducer
