import React from "react";
// import Button from "@material-ui/core/Button";

const MyButton = ({ onClick, text }) => {
  return (
    <div className="button">
      <button variant="contained" onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default MyButton;
