import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const RandSlice = createSlice({
  name: 'rand',
  initialState: {
    currentchar: {},
    chars: [],
    totalQuantity: 0,
    loading: false, 
    isShowing: false,
  },
  reducers: {
    replaceChars(state, action) {
      state.chars = action.payload.chars;
      state.totalQuantity = action.payload.totalQuantity;
    },

    getChar(state, action) {
      state.currentchar = action.payload.currentchar;
    },

    removeChar(state, action) {
      const charname = action.payload; 
      state.chars = state.chars.filter(char => char.name !== charname);
      if (state.totalQuantity > 0) {
        state.totalQuantity--;
      }
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

    setLoading(state, action) {
      state.loading = action.payload;
    },
    
    setShowing(state) {
      state.isShowing = !state.isShowing;
    }
  }
});

export const getRandomChar = () => {
  return async (dispatch) => {
    dispatch(RandActions.setLoading(true)); 

    try {
      const response = await axios.get('https://api.jikan.moe/v4/random/characters');
      dispatch(RandActions.getChar({ currentchar: response.data.data || {} }));
    } catch (error) {
      console.error('실패', error);
    } finally {
      dispatch(RandActions.setLoading(false)); 
    }
  };
};

//서버에 저장
export const postToServer = (chars, totalQuantity) => {
  return async () => {
    try {
      await axios.put(
        'https://reduxtoolkitprac-default-rtdb.firebaseio.com/data.json',
        { chars, totalQuantity }
      );
      console.log('데이터 전송 성공');
    } catch (error) {
      console.error('데이터 전송 실패:', error);
    }
  };
};

//서버에서 데이터 불러오기
export const getFromServer = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('https://reduxtoolkitprac-default-rtdb.firebaseio.com/data.json');
      const data = response.data || { chars: [], totalQuantity: 0 };
      dispatch(RandActions.replaceChars(data));
    } catch (error) {
      console.error('데이터 가져오기 실패:', error);
    }
  };
};

export const RandActions = RandSlice.actions;
export default RandSlice.reducer;
