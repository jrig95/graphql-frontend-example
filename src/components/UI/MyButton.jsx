import React from "react";
import Button from "@mui/material/Button";
// import Button from "@material-ui/core/Button";

const MyButton = ({variant, onClick, text, color, sx }) => {
  return (
    <div className="button">
      <Button variant={variant} color={color} onClick={onClick} sx={sx}>
        {text}
      </Button>
    </div>
  );
};

export default MyButton;
