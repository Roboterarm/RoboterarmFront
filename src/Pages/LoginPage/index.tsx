import styles from "./styles.module.scss"

import { ThemeProvider } from '@mui/material/styles';
import ligth from "../../components/themes/index.tsx";

import CardLogin from "../../components/cardLogin/index.tsx";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography/Typography";

export default function LoginRegisterPage() {

    return (
        <ThemeProvider theme={ligth}>
            <Grid>
                <Typography variant="h1" color="white">ROBOTERARM</Typography>
            </Grid>
            <Grid container sx={{ margin: "6%" }}>
                <Grid offset={{xs: 2, sm: 2, md: 3, lg: 3, xl:4 }} size={{xs: 8, sm: 8, md: 6, lg: 6, xl:4 }}>
                    <CardLogin/>
                </Grid>
            </Grid>
            <div className={styles.containerbackground}></div>        
        </ThemeProvider>
    );
}
