import { useEffect, useState, ReactElement } from "react";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
import { useNavigate } from "react-router-dom";
import Sair from "../../components/logout";
import axios from "axios";

interface ProtectedRouteProps {
    errorPage: ReactElement;
    targetPage: ReactElement;
  }
  
  interface DecodedToken {
    exp: number;
  }
  
  export default function ProtectedRoute({
    errorPage,
    targetPage,
  }: ProtectedRouteProps): ReactElement {
    const [loading, setLoading] = useState(true); // Estado para controlar o loading
    const [authorized, setAuthorized] = useState(false); // Estado para saber se o usuário é autorizado
    const navigate = useNavigate();
  
    useEffect(() => {
      const token = sessionStorage.getItem("token");
      const refresh = sessionStorage.getItem("refresh");
  
      const verifyToken = async () => {
        if (!token || !refresh) {
          setAuthorized(false);
          setLoading(false);
          return;
        }
  
        try {
          const decodedAccessToken = jwtDecode<DecodedToken>(token);
          const { exp: accessExp } = decodedAccessToken;
  
          if (accessExp * 1000 - Date.now() <= 0) {
            const decodedRefreshToken = jwtDecode<DecodedToken>(refresh);
            const { exp: refreshExp } = decodedRefreshToken;
  
            if (refreshExp * 1000 - Date.now() <= 0) {
              setAuthorized(false);
              console.log("Testesse")
              navigate("/sair");
            } 
            else {
              try {
                const response = await axios.post("http://localhost:3000/auth/refresh", {
                  token: refresh,
                });

                const newToken = response.data.accessToken;
                console.log(newToken)

                if (newToken) {
                  sessionStorage.setItem("token", newToken);
                  setAuthorized(true);
                } else {
                  console.log("Teste")
                  setAuthorized(false);
                }
              } catch (error) {
                console.error("Erro ao tentar renovar o token:", error);
                setAuthorized(false);
              }
            }
          } else {
            setAuthorized(true);
          }
        } catch (error) {
          console.error("Erro ao decodificar o token:", error);
          setAuthorized(false);
        }
  
        setLoading(false);
      };
  
      verifyToken();
    }, [navigate]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    // Se autorizado, exibe a página alvo, caso contrário, exibe a página de erro
    return authorized ? targetPage : errorPage;
  }