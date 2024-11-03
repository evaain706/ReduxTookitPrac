import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { getRandomChar, RandActions } from './store/RandAnimeSlice';
import ClipLoader from 'react-spinners/ClipLoader'; 
import { Favchar } from './components/FavChars';
import CharInfo from './components/charInfo';
import { useEffect } from 'react';
import { postToServer } from './store/RandAnimeSlice';
import { getFromServer } from './store/RandAnimeSlice';

function App() {





  const char = useSelector((state) => state.rand.currentchar);
  const charIndexQuantity = useSelector((state) => state.rand.totalQuantity);
  const loading = useSelector((state) => state.rand.loading);
  const isShowing = useSelector((state)=> state.rand.isShowing);
  const chars = useSelector((state) => state.rand.chars);

  const dispatch = useDispatch();

  const getAnimeChar = () => {
    dispatch(getRandomChar());
  };

  const saveAnimeChar = () => {
    dispatch(RandActions.addChar(char));
  };

  const setShowing = () => {
    dispatch(RandActions.setShowing());
  }
 
  useEffect(() => {
    dispatch(getFromServer());
  }, [dispatch]);

  // chars와 totalQuantity가 변경될 때만 Firebase에 데이터 저장
  useEffect(() => {
    if (chars.length > 0 || charIndexQuantity > 0) {
      dispatch(postToServer(chars, charIndexQuantity));
    }
  }, [chars, charIndexQuantity, dispatch]);
  
  

  

  return (
    <div className="App min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex space-x-4 justify-center mb-6">
          <button
            onClick={getAnimeChar}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-md"
          >
            캐릭터 불러오기
          </button>
          <button
            onClick={saveAnimeChar}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-md"
          >
            현재 캐릭터 저장하기
          </button>
          <button
            onClick={setShowing}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded shadow-md"
          >
            현재 저장된 캐릭터 표시/비표시
          </button>
        </div>

      
        <h2 className="text-center text-2xl font-semibold text-gray-700 mb-8">
          저장된 캐릭터 수: {charIndexQuantity}
        </h2>

       
        <CharInfo loading={loading} char={char} />

        <Favchar isShowing={isShowing}/>
      </div>
    </div>
  );
}

export default App;
