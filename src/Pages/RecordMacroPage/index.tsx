
import { useContext, useEffect, useState } from "react";

// FireBase
import FirebaseContext from "../../context/firebaseContext";
import { get, getDatabase, ref } from "firebase/database";

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
import axios from "axios";

export default function RecordMacroPage() {
    const fb = useContext(FirebaseContext);
    const db = getDatabase(fb);

    const [name, setName] = useState("Roboterarm");
    const [isEditing, setIsEditing] = useState(false);

    const [timeLeft, setTimeLeft] = useState<number>(30);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    const [posX, setPosX] = useState(0);
    const [posY, setPosY] = useState(0);
    const [posZ, setPosZ] = useState(0);
    const [rotX, setRotX] = useState(0);
    const [rotY, setRotY] = useState(0);
    const [rotZ, setRotZ] = useState(0);
    const [muscle, setMuscle] = useState(0);

    const [id, setId] = useState("")

    const createMacro = async () => {
        try {
            const res = (await get(ref(db, 'values/'))).val();
            setPosX(res.posX);
            setPosY(res.posY);
            setPosZ(res.posZ);
            setRotX(res.rotX);
            setRotY(res.rotY);
            setRotZ(res.rotZ);
            setMuscle(res.muscle);

            const token = sessionStorage.getItem("token");

            const armState = {
                posX: res.posX,
                posY: res.posY,
                posZ: res.posZ,
                rotX: res.rotX,
                rotY: res.rotY,
                rotZ: res.rotZ,
                muscle: res.muscle
            };

            const response = await axios.post('http://localhost:3000/macro/register', {
                name: name,
                armState: armState
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            await setId(response.data._id)
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };


    const updateMacro = async () => {
        try {
            const res = (await get(ref(db, 'values/'))).val();
            setPosX(res.posX);
            setPosY(res.posY);
            setPosZ(res.posZ);
            setRotX(res.rotX);
            setRotY(res.rotY);
            setRotZ(res.rotZ);
            setMuscle(res.muscle);

            const token = sessionStorage.getItem("token");

            const armState = {
                posX: res.posX,
                posY: res.posY,
                posZ: res.posZ,
                rotX: res.rotX,
                rotY: res.rotY,
                rotZ: res.rotZ,
                muscle: res.muscle
            };

            console.log(id)

            const response = await axios.put('http://localhost:3000/macro/update', {
                id: id,
                armState: armState,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            console.log(response)

        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;

        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
                updateMacro();
            }, 1000);

        } else if (timeLeft === 0) {
            setIsRunning(false);
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isRunning, timeLeft, posX, posY, posZ, rotX, rotY, rotZ, muscle]);

    const startTimer = async () => {
        await createMacro();
        setIsRunning(true);
        setTimeLeft(30);
    };

    const EditName = () => {
        setIsEditing(!isEditing);
    };

    const InputBlur = () => {
        setIsEditing(false); // Desabilitar edição ao sair do input
    };

    return (
        <ThemeProvider theme={ligth}>
            <Navbar />
            <Grid container sx={{ marginTop: "2%" }} alignItems="center" direction="row">
                <Grid container offset={{ xs: 0, sm: 0, md: 3, lg: 4, xl: 4 }} size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }} justifyContent="center" alignItems="center">
                    {!isEditing ? (
                        <Typography
                            variant="h1"
                        >
                            {name}
                        </Typography>
                    ) : (
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onBlur={InputBlur} // Sai do modo de edição ao perder o foco
                            style={{
                                fontSize: '4rem', // Mesmo tamanho do texto para manter consistência
                                fontWeight: 'bold',
                                border: 'none',
                                outline: 'none',
                                backgroundColor: 'transparent',
                                width: 'auto',
                                textAlign: 'center',
                            }}
                            autoFocus
                        />
                    )}
                    <IconButton onClick={EditName} color="primary" aria-label="Edit" sx={{ justifyContent: "center", alignItems: "center", marginLeft: "10px" }}>
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
                            <TimerIcon color="primary" sx={{ marginTop: "3%", marginRight: "2%", width: "30px", height: "auto" }} />
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
                    <ButtonStandard onClick={() => window.location.reload()} text="Reset" />
                </Grid>
            </Grid>
            {/* <img src={background} className={styles.background} alt="bg2" /> */}
        </ThemeProvider >
    );
}