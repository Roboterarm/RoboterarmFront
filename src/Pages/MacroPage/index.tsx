
import { useContext, useEffect, useState } from "react";

// FireBase
import FirebaseContext from "../../context/firebaseContext";
import { get, getDatabase, ref, set } from "firebase/database";

// Tema
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import ligth from "../../components/themes";

// Icons
import IconButton from "@mui/material/IconButton/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import TimerIcon from '@mui/icons-material/Timer';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

// My Functions
import Navbar from "../../components/navbar";
import RAInput from "../../components/ra_input";
import ButtonStandard from "../../components/buttonNavigation";

// Material UI Functions
import Grid from "@mui/material/Grid2/Grid2";
import LinearProgress from '@mui/material/LinearProgress';
import Typography from "@mui/material/Typography/Typography";


export default function MacroPage() {
    const fb = useContext(FirebaseContext); 
    const db = getDatabase(fb);
    
    const [timeLeft, setTimeLeft] = useState<number>(30);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    const [posX, setPosX] = useState(0);
    const [posY, setPosY] = useState(0);
    const [posZ, setPosZ] = useState(0);
    const [rotX, setRotX] = useState(0);
    const [rotY, setRotY] = useState(0);
    const [rotZ, setRotZ] = useState(0);
    const [muscle, setMuscle] = useState(0);

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;

        const fetchData = async () => {
            try {
                const res = (await get(ref(db, 'values/'))).val();
                setPosX(res.posX);
                setPosY(res.posY);
                setPosZ(res.posZ);
                setRotX(res.rotX);
                setRotY(res.rotY);
                setRotZ(res.rotZ);
                setMuscle(res.muscle);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);

            fetchData(); 

        } else if (timeLeft === 0) {
            setIsRunning(false);
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);

    const startTimer = () => {
        setIsRunning(true);
        setTimeLeft(30);
    };

    return (
        <ThemeProvider theme={ligth}>
            <Navbar />
            <Grid container sx={{ marginTop: "2%" }} alignItems="center" direction="row">
                <Grid container offset={{ xs: 0, sm: 0, md: 3, lg: 4, xl: 4 }} size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }} justifyContent="center" alignItems="center">
                    <Typography variant="h1" >Roboterarm</Typography>
                    <IconButton color="primary" aria-label="Edit" sx={{ justifyContent: "center", alignItems: "center", marginLeft: "10px" }}>
                        <EditIcon sx={{ width: "30px", height: "auto", color: "#151D6" }} />
                    </IconButton>
                </Grid>
                <Grid container offset={{ xs: 0, sm: 0, md: 3, lg: 4, xl: 4 }} size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }} justifyContent="center" alignItems="center" sx={{ marginTop: "2%" }}>
                    <IconButton color="primary" onClick={startTimer} disabled={isRunning}>
                        <PlayArrowIcon sx={{ width: "auto", height: "160px", color: "#151D6" }} />
                    </IconButton>
                <Grid />
                <Grid direction="row"
                offset={{ xs: 2, sm: 2, md: 0, lg: 0, xl: 0 }}
                size={{ xs: 8, sm: 8, md: 12, lg: 12, xl: 12 }}>
                    <Grid
                    direction="row" display="flex" justifyContent="center" alignItems="center"
                    offset={{ xs: 0, sm: 0, md: 3, lg: 4, xl: 0 }}
                    size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }}>
                        <TimerIcon color="primary" sx={{marginTop: "3%", marginRight: "2%", width: "30px", height: "auto"}}/>
                        <Typography variant="h2">{timeLeft}</Typography>
                    </Grid>
                    <Grid
                    offset={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }}
                    size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                        <LinearProgress
                            variant="determinate"
                            color="primary"
                            value={(timeLeft / 30) * 100}
                            sx={{ height: 20, marginBottom: 3 }}
                        />
                    </Grid>
                </Grid>
                <Grid
                    container
                    size={{ xs: 10, sm: 10, md: 10, lg: 6, xl: 6 }}
                    offset={{ xs: 1, sm: 1, md: 1, lg: 0, xl: 0 }}
                    direction="column"
                >

                    <RAInput value={posX} disabled label={"Pos. X"} />
                    <RAInput value={posY} disabled label={"Pos. Y"} />
                    <RAInput value={posZ} disabled label={"Pos. Z"} />
                </Grid>
                <Grid
                    container
                    size={{ xs: 10, sm: 10, md: 10, lg: 6, xl: 6 }}
                    offset={{ xs: 1, sm: 1, md: 1, lg: 0, xl: 0 }}
                    direction="column"
                >
                    <RAInput value={rotX} disabled label={"Rot. X"} />
                    <RAInput value={rotY} disabled label={"Rot. Y"} />
                    <RAInput value={rotZ} disabled label={"Rot. Z"} />

                </Grid>
                <Grid
                    container
                    justifyContent="center" alignItems="center"
                    size={{ xs: 10, sm: 10, md: 10, lg: 6, xl: 6 }}
                    offset={{ xs: 1, sm: 1, md: 1, lg: 0, xl: 0 }}
                >
                    <RAInput value={muscle} disabled label={"Muscle"} size={{ xs: 12, md: 12 }} />
                </Grid>
            </Grid>
            <Grid container
                justifyContent="center" alignItems="center" spacing={2}
                offset={{ xs: 1, sm: 1, md: 1, lg: 3, xl: 4 }}
                size={{ xs: 10, sm: 10, md: 10, lg: 6, xl: 4 }}
                marginTop="30px">
                <ButtonStandard path="/macros" text="Macros" />
                <ButtonStandard path="/macros" text="Salvar" />
                <ButtonStandard path="/macros" text="Reset" />
            </Grid>
        </Grid>
            {/* <img src={background} className={styles.background} alt="bg2" /> */ }
        </ThemeProvider >
    );
}