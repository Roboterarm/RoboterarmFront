import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from '@mui/material/Alert/Alert';
import AlertTitle from '@mui/material/AlertTitle/AlertTitle';
export default function CardLogin() {
    const navigate = useNavigate(); 

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  const login = async () => {
    
    // if(!email || !password)
    //   return console.error("Senha está diferente do Confirmar Senha")

    try {
        const response = await axios.post('http://localhost:3000/auth/login', {
          email: email,
          pass: password
        });
        if (response.status === 200) {
            console.log("Usuário logado com sucesso!");
            navigate('/home');
        } else {
            console.error("Erro ao fazer login:", response.data.message);
        }
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        // alert("Os dados não conferem!") refazer alert
    }
};


  const card = (
    <React.Fragment>
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
          <Typography variant="h1" component="div" sx={{fontSize: "60px", margin: '10px' }}>Login</Typography>
          <TextField
            required
            id="standard-required"
            label="Email"
            variant="standard"
            sx={{ margin: "10px 80px" }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            required
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
            sx={{ margin: "10px 80px" }}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
      </CardContent>
      <CardActions sx={{justifyContent: "center"}}>
        <Button variant="contained" sx={{ width: "140px", height: "50px", margin: "20px"}}>Cadastrar-se</Button>
        <Button variant="outlined" sx={{ width: "140px", height: "50px", margin: "20px 30px"}}  onClick={login}>Entrar</Button>
      </CardActions>
    </React.Fragment>
  );
  return (
    <Paper>
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">{card}</Card>
      </Box>
    </Paper>
  );
}