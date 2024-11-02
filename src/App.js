import logo from './logo.svg';
import './App.css';
import { useState,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getRandomChar, RandActions } from './store/RandAnimeSlice';





function App() {

  const char = useSelector((state)=> state.rand.currentchar);
  const charIndex = useSelector((state)=> state.rand.chars)
  const charIndexQuantitiy = useSelector((state)=> state.rand.totalQuantity);


  const dispatch = useDispatch();



  const getAnimeChar = () => {

    dispatch(getRandomChar());
  }

  const saveAnimeChar = () => {
    dispatch(RandActions.addChar(char));
  };

  const deleteAnimeChar = (charname) => {
    dispatch(RandActions.removeChar(charname)); 
  };

 


  return (
    <div className="App">
      <button onClick={getAnimeChar}>눌러</button>
      <button onClick={saveAnimeChar}>현재 캐릭터 저장하기</button> 
      <h2>저장된캐릭터수:{charIndexQuantitiy}</h2>

      {char && char.name ? (  
        <div>
          <h2>이름: {char.name} ({char.name_kanji})</h2>
          <p>설명: {char.about}</p>
          <p>좋아하는 수: {char.favorites}</p>
          <img src={char.images.jpg.image_url} alt={char.name} width="200" />
          <p>
            <a href={char.url} target="_blank" rel="noopener noreferrer">
              캐릭터 프로필
            </a>
          </p>
        </div>
      ) : (
        <p>버튼을 눌러주세요</p> 
      )}


       
          <div>
        {charIndex && charIndex.length > 0 ? ( 
          charIndex.map((character, index) => (
            <div key={index}>
              <h2>{character.name}</h2>
              <img src={character.images.jpg.image_url} alt={character.name} width="200" />
              <button onClick={() => deleteAnimeChar(character.name)}>삭제</button> 
            </div>
          ))
        ) : (
          <p>저장된 캐릭터가 없습니다.</p>
        )}
      </div>

    </div>
  
 




  );
}

export default App;
