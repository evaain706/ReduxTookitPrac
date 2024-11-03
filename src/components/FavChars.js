    import { useSelector ,useDispatch} from "react-redux";
    import { RandActions } from "../store/RandAnimeSlice";

   export const Favchar = ({isShowing}) =>{

        const dispatch = useDispatch();


        const deleteAnimeChar = (charname) => {
            dispatch(RandActions.removeChar(charname));
          };
          


        const charClick = (url) => {

            window.open(url,"_blank","noppener,noreferrer");

        }
      

      

        const charIndex = useSelector((state) => state.rand.chars);


        return(
           <>

           {isShowing &&  
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {charIndex && charIndex.length > 0 ? (
           charIndex.map((character, index) => (
               <div  key={index} className="bg-white shadow-lg rounded-lg p-4 text-center hover:animate-pulse ">
               <h2 className="text-lg font-bold text-gray-800">{character.name}</h2>
               <img
                   onClick={() => {charClick(character.url)}}
                   src={character.images.jpg.image_url}
                   alt={character.name}
                   className="mx-auto rounded-lg my-2 w-32 h-32 object-cover "
               />
               <button
                   onClick={() => deleteAnimeChar(character.name)}
                   className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
               >
                   삭제
               </button>
               </div>
           ))
           ) : (
           <p className="col-span-full text-center text-gray-500">저장된 캐릭터가 없습니다.</p>
           )}
           </div>
      
           }
               
                    
           </>
          

            )



    }