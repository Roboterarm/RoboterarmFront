import styles from "./styles.module.scss"

import { ThemeProvider } from '@mui/material/styles';
import ligth from "../../components/themes/index.tsx";
import Navbar from "../../components/navbar/index.tsx";

import background from "../../assets/Login/background.svg";
import CardLogin from "../../components/cardLogin/index.tsx";
import Grid from "@mui/material/Grid2";

export default function LoginRegisterPage() {

    return (
        <ThemeProvider theme={ligth}>
        <Navbar/>
            <Grid container sx={{margin: "12%"}}>
                <Grid offset={{xs: 2, sm: 2, md: 3, lg: 3, xl:4 }} size={{xs: 8, sm: 8, md: 6, lg: 6, xl:4 }}>
                    <CardLogin/>
                </Grid>
            </Grid>
        <img src={background} className={styles.background} alt="background" />
        </ThemeProvider>
    );
}
