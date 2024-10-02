import styles from "./styles.module.scss"

import ThemeProvider from "@mui/material/styles/ThemeProvider";
import ligth from "../../components/themes";
import Grid from "@mui/material/Grid2/Grid2";
import Container from "@mui/material/Container/Container";
import Navbar from "../../components/navbar";
import Paper from "@mui/material/Paper/Paper";
import Typography from "@mui/material/Typography/Typography";
import MacroList from "../../components/macroList";
import ButtonStandard from "../../components/buttonNavigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { set } from "firebase/database";

export default function MacrosPage() {

    return (
        <ThemeProvider theme={ligth}>
        <Navbar/>
        <Container>
            <Grid container justifyContent="center" 
            size={{ xs: 10, sm: 8, md: 8, lg: 6, xl: 6 }}
            offset={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 3 }}>
                <Grid size={12} sx={{ marginTop: "5%", marginBottom: "5%"}}>
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Paper sx={{width: "500px", height: "700px",borderRadius: "20px"}}>
                            <Typography variant="h2">Movimentos Salvos</Typography>
                            <MacroList/>
                        </Paper>
                    </Grid>
                    <Grid container
                        justifyContent="center" alignItems="center" spacing={2}
                        offset={{ xs: 1, sm: 1, md: 1, lg: 3, xl: 4 }}
                        size={{ xs: 10, sm: 10, md: 10, lg: 6, xl: 4 }}
                        marginTop="30px">
                        <ButtonStandard path="/home" text="Home" />
                        <ButtonStandard path="/recordmacro" text="Novo Macro" />
                        <ButtonStandard path="/sensor" text="Sensor" />
                    </Grid>
                </Grid>
            </Grid>
        </Container>
        <div className={styles.containerbackground}></div>        
        </ThemeProvider>
    );
}
