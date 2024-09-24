import ThemeProvider from "@mui/material/styles/ThemeProvider";
import ligth from "../../components/themes";

export default function AccesDenied() {

    return (
    <>
        <ThemeProvider theme={ligth}>
            <h1>ERROR ACCESS DENIED</h1>
        </ThemeProvider>
    </>
    )
}