import React from "react";

const SubmitButton = ({ onSubmit }) => {
    return (
        <button
            className="bg-yellow-600 text-black font-bold p-2 rounded w-full hover:bg-yellow-800 "
            onClick={onSubmit}
        >
            See Availability
        </button>
    );
};

export default SubmitButton;
