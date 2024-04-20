// src/components/PincodeLookupForm.jsx
import { useState } from "react";

const PincodeLookupForm = ({ onLookupClick }) => {
  const [pincode, setPincode] = useState("");

  const handlePincodeChange = (event) => {
    setPincode(event.target.value);
  };

  return (
    <div className="text-center">
      <span className="block mb-2 font-bold text-[35px] text-white">
        Enter Pincode
      </span>
      <div className="flex flex-col items-center">
        <input
          type="number"
          className="outline-none border border-gray-300 rounded-md px-4 py-2 mb-4 w-96 bg-white text-black"
          placeholder="Enter Pincode"
          value={pincode}
          onChange={handlePincodeChange}
        />
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          onClick={() => onLookupClick(pincode)}
        >
          Lookup
        </button>
      </div>
    </div>
  );
};

export default PincodeLookupForm;
