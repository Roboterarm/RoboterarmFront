import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface IButtonStandard {
  path?: string;
  text?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

const ButtonStandard: React.FC<IButtonStandard> = ({ path, text, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (path) {
      navigate(path);
    }
  };

  return (
    <Button
      variant="contained"
      sx={{ width: "140px", height: "50px", margin: "10px" }}
      onClick={handleClick}
    >
      {text}
    </Button>
  );
};

export default ButtonStandard;

{/* <Button variant="outlined" sx={{ width: "140px", height: "50px", margin: "20px 30px" }} type="submit" onClick={login}>Entrar</Button> */}
