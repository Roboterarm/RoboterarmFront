import ThemeProvider from "@mui/material/styles/ThemeProvider";
import styles from "./styles.module.scss"
import ligth from "../../components/themes";
import Navbar from "../../components/navbar";
import Container from "@mui/material/Container/Container";
import Grid from "@mui/material/Grid2/Grid2";
import Typography from "@mui/material/Typography/Typography";
import TextField from "@mui/material/TextField/TextField";
import ButtonStandard from "../../components/buttonNavigation";

export default function ProfilePage() {

    return (
        <ThemeProvider theme={ligth}>
            <Navbar />
            <Container>
                <Grid container justifyContent="center"
                    size={{ xs: 10, sm: 8, md: 8, lg: 6, xl: 6 }}
                    offset={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 3 }}>
                    <Grid size={12} sx={{ marginTop: "5%", marginBottom: "5%" }}>
                        <Typography variant="h1">Perfil</Typography>
                    </Grid>
                    <Grid size={12} container justifyContent="center" >
                        <TextField
                            disabled
                            label="Nome Completo"
                            variant="standard"
                            sx={{ margin: "10px 80px", width: "400px" }}
                        />
                        <TextField
                            disabled
                            label="Email"
                            variant="standard"
                            sx={{ margin: "10px 80px", width: "400px" }}
                        />
                        <TextField
                            disabled
                            label="Telefone"
                            variant="standard"
                            sx={{ margin: "10px 80px", width: "400px" }}
                        />
                        <TextField
                            disabled
                            label="Senha"
                            type="password"
                            autoComplete="current-password"
                            variant="standard"
                            sx={{ margin: "10px 80px", width: "400px" }}
                        />
                        <TextField
                            disabled
                            label="Confirmar Senha"
                            type="password"
                            autoComplete="current-password"
                            variant="standard"
                            sx={{ margin: "10px 80px", width: "400px" }}
                        />
                    </Grid>
                    <Grid container justifyContent="center" alignItems="center" size={12} marginTop='70px'>
                        <ButtonStandard path="/home" text="Home"></ButtonStandard>
                        {/* <ButtonStandard text="Editar"></ButtonStandard> */}
                    </Grid>
                </Grid>
            </Container>
            <div className={styles.containerbackground}></div>        
            </ThemeProvider>
    );
}