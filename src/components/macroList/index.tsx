import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { useEffect, useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';


export default function MacroList() {
  const [checked, setChecked] = useState<number[]>([]);
  const [macros, setMacros] = useState<any[]>([]); // Inicialize como uma lista vazia

  // Função para buscar macros do backend
  useEffect(() => {
    const fetchMacros = async () => {
      try {
        const token = sessionStorage.getItem("token");

        const response = await axios.get('http://localhost:3000/macro/get', {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        
        setMacros(response.data); // Armazena os macros no estado
      } catch (error) {
        console.error('Erro ao buscar macros:', error);
      }
    };

    fetchMacros();
  }, []);

  const handleDelete = async (id: string) => {
    try {
        const token = sessionStorage.getItem("token");

        console.log('Deleting macro with id:', id);
        await axios.delete(`http://localhost:3000/macro/delete`, {
            data: id,
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        setMacros((prevMacros) => prevMacros.filter((macro) => macro._id !== id));
    } catch (error) {
        console.error('Error while deleting macro:', error);
    }
  };

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
          <ListItemButton>
            <ListItemText primary={macro.name} />
          </ListItemButton>
          <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(macro._id)}>
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
}