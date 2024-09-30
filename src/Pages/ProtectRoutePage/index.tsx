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

export default function ProtectedRoute({ errorPage, targetPage }: ProtectedRouteProps): ReactElement {
    const [page, setPage] = useState<ReactElement>(<></>);
    const navigate = useNavigate();

    function renderPage(): void {
        const token = sessionStorage.getItem("token");
        const refresh = sessionStorage.getItem("refresh");

        if (!token || !refresh) {
            setPage(errorPage);
            return;
        }

        try {
            const decodedAccessToken = jwtDecode<DecodedToken>(token);
            const { exp: accessExp } = decodedAccessToken;

            if (accessExp * 1000 - Date.now() <= 0) {
                const decodedRefreshToken = jwtDecode<DecodedToken>(refresh);
                const { exp: refreshExp } = decodedRefreshToken;

                if (refreshExp * 1000 - Date.now() <= 0) {
                    setPage(<Sair />);
                } else {
                    axios.post('http://localhost:3000/auth/refresh', {
                        token: refresh
                    })
                    .then(response => {
                        const newToken = response.data.accessToken;
                        if (newToken) {
                            sessionStorage.setItem("token", newToken);
                            setPage(targetPage);
                        } else {
                            setPage(errorPage);
                        }
                    })
                    .catch(error => {
                        console.error('Erro ao tentar renovar o token:', error);
                        setPage(errorPage);
                    });
                }
            } else {
                setPage(targetPage);
            }
        } catch (error) {
            console.error("Erro ao decodificar o token:", error);
            setPage(errorPage);
        }
    }

    useEffect(() => {
        renderPage();
    }, []); 

    return page;
}