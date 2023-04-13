import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const SinglePost = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/post/${id}`).then((response) => {
      setPost(response);
    });
  }, []);
  console.log(post);
  return (
    <div>
      <h1>{post?.data?.title}</h1>
    </div>
  );
};

/* <div
ref={componentRef}
className="flex justify-center items-center relative bg-gray-300 pt-5 pb-10"
>
{recipe && (
    <div className="max-w-2xl mt-5 bg-gray-50 rounded-2xl overflow-hidden shadow-lg ">
        {!recipe.image && (
            <img
                alt="user image"
                className="w-full h-auto  rounded-t-2xl"
                src="https://cdn-icons-png.flaticon.com/512/1134/1134760.png"
            />
        )}
        {recipe.image && (
            <img
                alt="user"
                className="w-full h-auto  rounded-t-2xl "
                src={recipe?.image}
            />
        )}
        <div className="px-6 py-4 place-self-start">
            <div className="font-bold text-4xl mb-2 ">
                {recipe.name}
            </div>
            <h4 className="text-gray-700  text-xl">
                <strong>Region / Country: </strong>{" "}
                {recipe.region}
            </h4>
            <h4 className="text-gray-700 text-xl">
                <strong>food Type: </strong> {recipe.type}
            </h4>
            <h4 className="text-gray-700 text-xl">
                <strong>Services: </strong> {recipe.service}
            </h4>
            <div className="text-start  p-6">
                <div className="grid list-inside justify-items-start text-base">
                    <h4>
                        <strong>Ingredients:</strong>
                    </h4>
                    {recipe.ingredients.length ? (
                        recipe.ingredients.map((eachStep) => {
                            return (
                                <li>
                                    {`${eachStep.quantity} ${eachStep.measure} ${eachStep.singleIngredient}`}
                                </li>
                            );
                        })
                    ) : (
                        <h3></h3>
                    )}
                </div>

                <h4 className="text-gray-700 text-base"> </h4>
                <div className="grid content-start list-inside justify-items-start pt-6">
                    <h4>
                        <strong>Instructions:</strong>
                    </h4>
                    {recipe.instructions.length ? (
                        recipe.instructions.map(
                            (eachInstruction) => {
                                return (
                                    <li>{eachInstruction}</li>
                                );
                            }
                        )
                    ) : (
                        <h3></h3>
                    )}
                </div>
            </div>
            <h4 className="text-gray-700 text-base">
                <strong>Tips: </strong> {recipe.tips}
            </h4>
        </div>
        <div className="px-6 pt-4 pb-2">
            {!isLoggedIn ? (
                <>
                    <a href="/recipesHome">
                        <span className="inline-block bg-gray-200  rounded-full px-3 py-1 text-sm font-semibold text-gray-700 hover:bg-gray-700 mr-2 mb-2  hover:text-white">
                            explore more recipes
                        </span>
                    </a>
                </>
            ) : (
                <a href="/details">
                    <span className="inline-block bg-gray-200  rounded-full px-3 py-1 text-sm font-semibold text-gray-700 hover:bg-gray-700 mr-2 mb-2  hover:text-white">
                        explore more recipes
                    </span>
                </a>
            )}
            <span
                onClick={handlePrint}
                className="inline-block bg-gray-200  rounded-full px-3 py-1 text-sm font-semibold text-blue-700 hover:bg-blue-500 mr-2 mb-2 hover:text-white hover:border-transparent"
            >
                Print
            </span>
            /* <Link  to={`/edit/${id}`}> Edit</Link> 
             <Link  to={`/edit/${id}`}> Edit</Link> 
//             isLoggedIn && recipe.owner.id === user._id && (
//                 <>
//                     <a href="/details"></a>
//                     <span
//                         onClick={() => Delete(recipe._id)}
//                         className="inline-block bg-gray-200 hover:bg-red-500 rounded-full px-3 py-1 hover:text-white text-sm font-semibold text-red-700 mr-2 mb-2 hover:border-transparent"
//                     >
//                         Delete
//                     </span>
//                 </>
//             )}
//         </div>
//     </div>
// )}
// </div> */
