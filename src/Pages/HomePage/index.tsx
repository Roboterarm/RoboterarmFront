import styles from "./styles.module.scss"

import Grid from "@mui/material/Grid2";
import Navbar from "../../components/navbar/index.tsx";
import Stack from "@mui/material/Stack";
import SaveList from "../../components/saveList/index.tsx";
import { ThemeProvider } from '@mui/material/styles';
import ligth from "../../components/themes/index.tsx";

import background from "../../assets/Home/background.svg"
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate(); 

    return (
            <ThemeProvider theme={ligth}>
            <Navbar />
                <Grid container>
                    <Grid offset={{xs: 0, sm: 0, md: 1, lg: 2, xl:0 }} size={{xs: 12, sm: 12, md: 10, lg: 8, xl:6 }}>
                        <Typography variant="h1">Roboterarm</Typography>
                        <Stack
                            spacing={{ sm: 8 }}
                            direction="row"
                            useFlexGap
                            sx={{
                                flexWrap: 'wrap',
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: "4%",
                            }}
                        >
                            <Button variant="contained" className={styles.size} onClick={() => navigate("/macros")}>Macros</Button>
                            <Button variant="contained" className={styles.size} onClick={() => navigate("/sensor")}>Sensor</Button>
                            <Button variant="contained" className={styles.size} onClick={() => navigate("/macros")}>Criar Novo Movimento</Button>
                            <Button variant="contained" className={styles.size} onClick={() => navigate("/perfil")}>Perfil</Button>
                        </Stack>
                    </Grid>
                    <Grid size={{xs: 12, sm: 12, md: 12, lg: 12, xl:6 }} sx={{ marginTop: "5%"}}>
                        <Grid
                            container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Paper sx={{width: "500px", height: "700px",borderRadius: "20px"}}>
                                <Typography variant="h2">Movimentos Salvos</Typography>
                                <SaveList/>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            <img src={background} className={styles.background} alt="bg2" />
            </ThemeProvider>
    );
}