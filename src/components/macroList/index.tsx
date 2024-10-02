import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import EditIcon from '@mui/icons-material/Edit';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { useContext, useEffect, useRef, useState } from 'react';

// FireBase
import FirebaseContext from "../../context/firebaseContext";
import { get, getDatabase, ref, set } from "firebase/database";

import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { redirect } from 'react-router-dom';


export default function MacroList() {

  const sendingTimerRef = useRef<NodeJS.Timeout | undefined>()
  const statesLeftRef = useRef<number>(0)
  const [macros, setMacros] = useState<any[]>([]);
  const [currMacro, setCurrMacro] = useState<{
    name: "",
    owner: "",
    states: [],
    __v: "" ,
    _id: ""
  } |undefined>()


  const fb = useContext(FirebaseContext);
  const db = getDatabase(fb);

  const refreshTokens = async () => {
    const oldToken = sessionStorage.getItem("refresh")
    await axios.post('http://localhost:3000/auth/refresh',
        { token: oldToken })
    .then((res) => {
        sessionStorage.setItem("token", res.data['accessToken'])
        sessionStorage.setItem("refresh", res.data['refreshToken'])
    })
    .catch(() => redirect("login"))  
  }

  const fetchMacros = async (retry_count: number = 3) => {
    try {
      if (retry_count < 1)
        throw new Error('Could not create')

      const token = sessionStorage.getItem("token");

      await axios.get('http://localhost:3000/macro/get',
        { headers: { 'Authorization': `Bearer ${token}` } })
      .then((res) => { setMacros(res.data) })
      .catch(() => { refreshTokens(); fetchMacros(retry_count - 1) });

    } catch (error) {
      console.error('Erro ao buscar macros:', error);
    }
  };

  const handleDelete = async (id: string, retry_count: number = 3) => {
    try {
      if (retry_count < 1)
        throw new Error('Could not create')

      const token = sessionStorage.getItem("token");

      await axios.delete(`http://localhost:3000/macro/delete/${id}`,
        { headers: { Authorization: `Bearer ${token}` } } )
      .then(() => { fetchMacros()})
      .catch(() => { refreshTokens(); handleDelete(id, retry_count - 1) });;

      // setMacros((prevMacros) => prevMacros.filter((macro) => macro._id !== id));
    } catch (error) {
      console.error('Error while deleting macro:', error);
    }
  };

  const setFirebaseMacro = async (id: string, retry_count: number = 3) => {
    try {
      const token = sessionStorage.getItem("token");

      await axios.get(`http://localhost:3000/macro/get/${id}`,
        { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          setCurrMacro(res.data)
        }).catch(() => {
          refreshTokens(); setFirebaseMacro(id, retry_count - 1)
        });

    } catch (error) {
      console.error('Error while deleting macro:', error);
    }
  };

  useEffect(() => {
    fetchMacros();
  }, []);

  useEffect(() => {
    if (!currMacro)
      return
    
    if (currMacro.states.length > 0 && statesLeftRef.current == 0) {
      statesLeftRef.current = currMacro.states.length - 1
      sendingTimerRef.current = setInterval(async () => {
        try {
          const dbRef = ref(db);
          await set(dbRef, currMacro.states[statesLeftRef.current]);
        } catch (error) {
          console.error(`Erro ao enviar movimento ao Firebase:`, error);
        }
        console.log(currMacro.states[statesLeftRef.current])
        if (statesLeftRef.current < 1) {
          clearInterval(sendingTimerRef.current);
          setCurrMacro(undefined)
          return
        }
        
        statesLeftRef.current--;
      }, 1000);
    }
  }, [currMacro]);

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
          <ListItemButton onClick={async () => {await setFirebaseMacro(macro._id)}}>
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