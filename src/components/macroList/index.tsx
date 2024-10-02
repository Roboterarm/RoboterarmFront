import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import EditIcon from '@mui/icons-material/Edit';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { useContext, useEffect, useState } from 'react';

// FireBase
import FirebaseContext from "../../context/firebaseContext";
import { get, getDatabase, ref, set } from "firebase/database";

import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';


export default function MacroList() {
  const [checked, setChecked] = useState<number[]>([]);
  const [macros, setMacros] = useState<any[]>([]);
  const [macrosGet, setMacrosGet] = useState<object>({})

  const fb = useContext(FirebaseContext);
  const db = getDatabase(fb);

  useEffect(() => {
    const fetchMacros = async () => {
      try {
        const token = sessionStorage.getItem("token");

        const response = await axios.get('http://localhost:3000/macro/get', {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        setMacros(response.data);
      } catch (error) {
        console.error('Erro ao buscar macros:', error);
      }
    };

    fetchMacros();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const token = sessionStorage.getItem("token");

      await axios.delete(`http://localhost:3000/macro/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setMacros((prevMacros) => prevMacros.filter((macro) => macro._id !== id));
    } catch (error) {
      console.error('Error while deleting macro:', error);
    }
  };

  const getMacro = async (id: string) => {
    try {
      const token = sessionStorage.getItem("token");

      const response = await axios.get(`http://localhost:3000/macro/get/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setMacrosGet(response.data.states);

      // const res = (await get(ref(db, 'values/'))).val();
      // setPosX(res.posX);
      // setPosY(res.posY);
      // setPosZ(res.posZ);
      // setRotX(res.rotX);
      // setRotY(res.rotY);
      // setRotZ(res.rotZ);
      // setMuscle(res.muscle);

      console.log(macrosGet)
    } catch (error) {
      console.error('Error while deleting macro:', error);
    }
  };

  useEffect(() => {
    if (Object.keys(macrosGet).length > 0) {
      Object.entries(macrosGet).forEach(async ([key, value], index) => {
        try {
          const dbRef = ref(db, `macro/${key}`);
          await set(dbRef, value);
          console.log(`Movimento ${index} (${key}) enviado ao Firebase`, value);
        } catch (error) {
          console.error(`Erro ao enviar movimento ${key} ao Firebase:`, error);
        }
      });
    }
  }, [macrosGet]);

  return (
    <List sx={{
      width: '100%',
      maxWidth: 500,
      maxHeight: 640,
      height: 600,
      overflow: 'auto',
      bgcolor: 'background.paper',
    }}>
      {macros.map((macro) => (
        <ListItem key={macro._id}>
          <ListItemButton onClick={async () => await getMacro(macro._id)}>
            <ListItemText primary={macro.name} />
          </ListItemButton>
          <IconButton edge="end" aria-label="edit" sx={{ marginRight: "5px" }} onClick={() => {}}>
            <EditIcon />
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(macro._id)}>
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
}