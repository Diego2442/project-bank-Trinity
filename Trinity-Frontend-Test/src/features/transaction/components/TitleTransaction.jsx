import React from "react";
import { useSelector } from "react-redux";

export const TitleTransaction = () => {
    const {user} = useSelector((state) => state.user_state)
    //console.log(user)

  return (
    <>
    <div className="flex justify-center items-center m-auto my-8">
      <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-5xl dark:text-white">
      Transfer to Asociate Users 
      </h1>
    </div>
    <div className="flex justify-center items-center m-auto my-8">
      <h1 className="mb-4 text-1xl font-semibold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-4xl dark:text-white">
      {user&&user.full_name + ' - Document: ' + user.document_number}
      </h1>
    </div>
    </>
    );
};
