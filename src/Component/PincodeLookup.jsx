import React, { useState } from "react";
import PincodeLookupForm from "./PincodeLookupForm";
import { ToastContainer, toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import Card from "./Card";
import "react-toastify/dist/ReactToastify.css";

const PincodeLookup = () => {
  const [pincodeDetails, setPincodeDetails] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [loading, setLoading] = useState(false);
  const [pincode, setPincode] = useState("");

  const handleLookupClick = async (pincode) => {
    if (pincode.length !== 6) {
      toast.error("Length of Pincode should be equal to 6");
      return;
    }
    setPincode(pincode);
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`
      );

      const data = await response.json();
      console.log("API response:", data);

      if (!data || !data[0] || !data[0].PostOffice) {
        throw new Error("Invalid response format");
      }
      const { Message, PostOffice, Pincode } = data[0];
      setPincodeDetails({
        Message: Message,
        postOffice: PostOffice,
        Pincode: Pincode,
      });
      setTimeout(() => {
        setLoading(false);
        setShowForm(false);
      }, 2000);
    } catch (error) {
      console.error("Error fetching pincode details:", error);
      toast.error("Oops! wrong pincode");
      setLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    const specificName = event.target.value.trim().toLowerCase();
    setSearchQuery(specificName);
  };
  console.log("Length of postOffice:", pincodeDetails?.postOffice.length);
  return (
    <div>
      {showForm && <PincodeLookupForm onLookupClick={handleLookupClick} />}
      {loading ? (
        <div className=" container flex justify-center items-center">
          <BeatLoader color="#36D7B7" size={15} />
        </div>
      ) : pincodeDetails ? (
        <div className="flex flex-col">
          <p className="text-[25px] text-white mx-4">Pincode: {pincode}</p>
          <p className="text-[25px] text-white mx-4">
            Message: {pincodeDetails.Message}
          </p>
          <div>
            <div className="rounded-md p-4 mb-4 w-100 text-center">
              <input
                type="text"
                placeholder="Search Post Office"
                value={searchQuery}
                onChange={handleSearchChange}
                className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-96 bg-white text-black"
              />
            </div>
            <p className="text-[30px] text-white font-bold m-4">
              Post Office Details:
            </p>

            <div className="flex justify-center flex-wrap m-6 gap-9">
              {pincodeDetails.postOffice
                .filter((office) =>
                  office.Name.toLowerCase().includes(searchQuery)
                )
                .map((office, index) => (
                  <Card
                    key={index}
                    name={office.Name}
                    branch={office.BranchType}
                    status={office.DeliveryStatus}
                    district={office.District}
                    state={office.State}
                  />
                ))}

              {pincodeDetails?.postOffice.length === 0 && (
                <p className="text-white">
                  Couldn’t find the postal data you’re looking for…
                </p>
              )}
            </div>
          </div>
        </div>
      ) : null}{" "}
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
      />
    </div>
  );
};

export default PincodeLookup;
