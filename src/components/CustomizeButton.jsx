import React from "react";

const CustomizeButton = ({
  title,
  handleClick,
  className = "",
  disabled = false,
  type = "button",
}) => {
  return (
    <button
      onClick={handleClick}
      className={`rounded-full min-h-12 flex text-base font-medium justify-center bg-[#BA8BF9] hover:opacity-90 transition-all duration-300 text-white items-center font-sauage ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={disabled}
      type={type}
    >
      {title}
    </button>
  );
};

export default CustomizeButton;
