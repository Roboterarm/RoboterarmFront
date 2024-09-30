import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Sair = () => {
  useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();
  }, []);

  return <Navigate to="/" />;
};

export default Sair;