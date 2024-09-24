import { useEffect, useState, ReactElement } from "react";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";


interface ProtectedRouteProps {
    errorPage: ReactElement;
    targetPage: ReactElement;
}
interface DecodedToken {
    exp: number;
}

export default function ProtectedRoute({ errorPage, targetPage }: ProtectedRouteProps): ReactElement {
    const [page, setPage] = useState<ReactElement>(<></>);

    function renderPage(): void {
        const token = sessionStorage.getItem("token");

        if (!token) {
            setPage(errorPage);
            return;
        }

        const decodedToken = jwtDecode<DecodedToken>(token);
        const { exp } = decodedToken;

        if (exp * 1000 - Date.now() <= 0) {
            setPage(errorPage);
            return;
        }

        setPage(targetPage);
    }

    useEffect(() => {
        renderPage();
    }, []);

    return page;
}