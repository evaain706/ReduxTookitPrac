
import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const CharInfo = ({ loading, char }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center mb-8">
        <ClipLoader color="#3b82f6" loading={loading} size={50} />
      </div>
    );
  }

  if (char && char.name) {
    return (
      <div>
        <h2 className="text-xl font-bold text-gray-800">
          이름: {char.name} ({char.name_kanji || char.name_korean})
        </h2>
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8 mx-auto text-center grid grid-cols-2 divide-x">
          <div>
            <img
              src={char.images.jpg.image_url}
              alt={char.name}
              className="mx-auto rounded-lg my-4 w-70 h-70 object-cover"
            />
            <a
              href={char.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 underline"
            >
              캐릭터 프로필
            </a>
          </div>
          <div className="items-center justify-center">
            <p className="text-gray-600 my-2">설명: {char.about}</p>
            <p className="text-gray-600">좋아하는 수: {char.favorites}</p>
          </div>
        </div>
      </div>
    );
  }

  return <p className="text-center text-gray-500 mb-8">버튼을 눌러주세요</p>;
};

export default CharInfo;
