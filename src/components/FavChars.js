import { useSelector, useDispatch } from "react-redux";
import { RandActions } from "../store/RandAnimeSlice";
import { useRef, useState } from "react";

export const Favchar = ({ isShowing }) => {
  const [isHover, setIsHover] = useState(null);
  
  const dispatch = useDispatch();

  const deleteAnimeChar = (charname) => {
    dispatch(RandActions.removeChar(charname));
  };

  const charClick = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const charIndex = useSelector((state) => state.rand.chars);

  return (
    <>
      {isShowing && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {charIndex && charIndex.length > 0 ? (
            charIndex.map((character, index) => (
              <div
                key={index}
                className="relative bg-white shadow-lg rounded-lg p-4 text-center hover:animate-pulse"
                onMouseEnter={() => setIsHover(index)} 
                onMouseLeave={() => setIsHover(false)} 
              >
                <h2 className="text-lg font-bold text-gray-800">
                  {character.name}
                </h2>
                <img
                  onClick={() => charClick(character.url)}
                  src={character.images.jpg.image_url}
                  alt={character.name}
                  className="mx-auto rounded-lg my-2 w-32 h-32 object-cover"
                />
                {/* 마우스가 올라간 카드에만 텍스트 표시 */}
                {isHover === index && (
                  <p className="absolute  top-1/2  left-1/2 transform -translate-x-1/2 text-xs text-gray-600 bg-white bg-opacity-75 px-2 py-1 rounded">
                    이미지 클릭시 소개페이지로 이동
                  </p>
                )}
                <button
                  onClick={() => deleteAnimeChar(character.name)}
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
                >
                  삭제
                </button>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              저장된 캐릭터가 없습니다.
            </p>
          )}
        </div>
      )}
    </>
  );
};
