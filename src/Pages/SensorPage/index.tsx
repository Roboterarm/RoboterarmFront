import styles from "./styles.module.scss";
import bg2 from "/bg2.svg";

import { useContext, useState } from "react";
import { get, getDatabase, ref, set } from "firebase/database";
import { Container, Paper, ThemeProvider, Typography } from "@mui/material";
import ligth from "../../components/themes/index.tsx";
import Grid from "@mui/material/Grid2";
import PrecisionManufacturing from '@mui/icons-material/PrecisionManufacturing';

import RAInput from "../../components/ra_input";
import FirebaseContext from "../../context/firebaseContext";
import Navbar from "../../components/navbar";
import ButtonStandard from "../../components/buttonNavigation/index.tsx";

export default function SensorPage() {
  const fb = useContext(FirebaseContext); 
  const db = getDatabase(fb);

  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const [posZ, setPosZ] = useState(0);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [rotZ, setRotZ] = useState(0);
  const [muscle, setMuscle] = useState(0);

  function writeUserData() {
    // console.log("Set value to " + value)
    // setPosX(value)
    set(ref(db, 'values/'), {
      posX: 1,
      posY: 2,
      posZ: 3,
      rotX: 4,
      rotY: 5,
      rotZ: 6,
      muscle: 7
    });
  }

  async function readUserData() {
    const res = (await get(ref(db, 'values/'))).val();
    setPosX(res.posX);
    setPosY(res.posY);
    setPosZ(res.posZ);
    setRotX(res.rotX);
    setRotY(res.rotY);
    setRotZ(res.rotZ);
    setMuscle(res.muscle);
  }

  return (
    <ThemeProvider theme={ligth}>
    <Navbar/>
    <Container>
        <Grid container justifyContent="center" 
        size={{ xs: 10, sm: 8, md: 8, lg: 6, xl: 6 }}
        offset={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 3 }}>
          <Grid>
            <Typography variant="h1">Sensores</Typography>
          </Grid>
          <Grid container size={12} justifyContent="center" alignItems="center">
              <PrecisionManufacturing color="primary" sx={{width: "300px", height: "auto"}}/>
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
          <Grid container justifyContent="center" alignItems="center"
              size={{ xs: 10, sm: 10, md: 10, lg: 6, xl: 6 }}
              offset={{ xs: 1, sm: 1, md: 1, lg: 0, xl: 0 }}
          >
              <RAInput value={muscle} disabled label={"Muscle"} size={{ xs: 12, md: 12 }} />
          </Grid>
          <Grid container justifyContent="center" alignItems="center" size={12}>
            <ButtonStandard onClick={() => writeUserData()} text="UPP"></ButtonStandard>
            <ButtonStandard onClick={() => readUserData()} text="DOWN"></ButtonStandard>
          </Grid>
        </Grid>
      {/* <img src={bg2} className={styles.bgbars} alt="bg2" /> */}
    </Container>        
    </ThemeProvider>
  );
}
