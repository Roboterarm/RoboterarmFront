import styles from "./styles.module.scss"

import { ThemeProvider } from '@mui/material/styles';
import ligth from "../../components/themes/index.tsx";
import Navbar from "../../components/navbar/index.tsx";

import background from "../../assets/Login/background.svg"
import Grid from "@mui/material/Grid2";
import CardRegister from "../../components/cardRegister/index.tsx";

export default function RegisterPage() {

    return (
        <ThemeProvider theme={ligth}>
        <Navbar/>
            <Grid container sx={{margin: "12%"}}>
                <Grid offset={4} size={4} sx={{alignItems: "center", justifyContent: "center", display: "flex"}}>
                    <CardRegister/>
                </Grid>
            </Grid>
        <img src={background} className={styles.background} alt="background"/>
        </ThemeProvider>
    );
}
