import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const RandSlice = createSlice({

    name:'rand',

    initialState:{
     currentchar:{},
     chars:[],
     totalQuantity:0,
    },

    reducers:{

        getChar(state,action){
            state.currentchar = action.payload.currentchar;
        },

        removeChar(state,action){
            const charname = action.payload; 
            state.chars = state.chars.filter(char => char.name !== charname);
            state.totalQuantity = state.chars.length; 

        },

        addChar(state, action) {
            const newChar = action.payload;
           
            const isExist = state.chars.some(char => char.name === newChar.name);
        
            if (isExist) {
                window.alert('중복된 캐릭터입니다.');
            } else {
                state.chars = [...state.chars, newChar]; 
                state.totalQuantity++;
            }
        },
    }

})



//thunk 연습
export const getRandomChar = () => {
    return async dispatch => {
        
            try {
                     const response = await axios.get('https://api.jikan.moe/v4/random/characters');
                      dispatch(RandActions.getChar({
                        currentchar: response.data.data || {},
                      }))
                      
                   
                 } catch (error) {
                       console.error('실패', error);
                     }

        }


    }




  export const RandActions = RandSlice.actions;

  export default RandSlice.reducer;