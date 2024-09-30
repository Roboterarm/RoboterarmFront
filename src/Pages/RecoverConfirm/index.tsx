import styles from "./styles.module.scss"

import { ThemeProvider } from '@mui/material/styles';
import ligth from "../../components/themes/index.tsx";

import background from "../../assets/Login/background.svg";
import Grid from "@mui/material/Grid2";
import React, { useState } from "react";
import CardContent from "@mui/material/CardContent/CardContent";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button/Button";
import CardActions from "@mui/material/CardActions/CardActions";
import { useNavigate } from "react-router-dom";
import { Paper } from "@mui/material";

export default function RecoverConfirmPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    return (
        <ThemeProvider theme={ligth}>
            <Grid>
                <Typography variant="h1" color="white">ROBOTERARM</Typography>
            </Grid>
            <Grid container sx={{ margin: "6%" }}>
                <Grid offset={{ xs: 2, sm: 2, md: 3, lg: 3, xl: 4 }} size={{ xs: 8, sm: 8, md: 6, lg: 6, xl: 4 }}>
                    <React.Fragment>
                        <Paper>
                            <CardContent>
                                <Box sx={{
                                    display: 'grid',
                                    alignItems: 'flex-start',
                                    flexDirection: 'column',
                                    p: 1,
                                    m: 1,
                                    borderRadius: 1,
                                    textAlign: "center",
                                }}>
                                    <Typography variant="h1" component="div" sx={{ fontSize: "40px", margin: '10px' }}>Email Enviado</Typography>
                                    <Typography variant="h2" component="div" sx={{ fontSize: "18px", margin: '10px' }}>Agora você deve verificar a caixa de entrada do seu email, pois foi lhe enviado um email para colocar uma nova senha!</Typography>
                                </Box>
                            </CardContent>
                            <CardActions sx={{ justifyContent: "center" }}>
                                <Button variant="contained" sx={{ width: "140px", height: "50px", margin: "20px 30px" }} onClick={() => navigate("/")}>Voltar</Button>
                            </CardActions>
                        </Paper>
                    </React.Fragment>
                </Grid>
            </Grid>
            <img src={background} className={styles.background} alt="background" />
        </ThemeProvider>
    );
}
