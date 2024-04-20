import React from "react";

const Card = ({ name, branch, status, district, state }) => {
  return (
    <div
      className="flex-1 sm:w-[350px] sm:min-w-[350px] 
    w-full rounded-[20px] shadow-3xl px-10 py-16 bg-white"
    >
      <div className="mb-4 bg-white">
        <p className="font-bold inline-block mr-2 bg-white">Name:</p>
        <p className="inline-block bg-white">{name}</p>
      </div>
      <div className="mb-4 bg-white">
        <p className="font-bold inline-block mr-2 bg-white">Branch Type:</p>
        <p className="inline-block bg-white">{branch}</p>
      </div>
      <div className="mb-4 bg-white">
        <p className="font-bold inline-block mr-2 bg-white">Delivery Status:</p>
        <p className="inline-block bg-white">{status}</p>
      </div>
      <div className="mb-4 bg-white">
        <p className="font-bold inline-block mr-2 bg-white">District:</p>
        <p className="inline-block bg-white">{district}</p>
      </div>
      <div className="mb-4 bg-white">
        <p className="font-bold inline-block mr-2 bg-white">Division:</p>
        <p className="inline-block bg-white">{state}</p>
      </div>
    </div>
  );
};

export default Card;
