import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ButtonMid from '../buttonMid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

export default function CardRegister() {
  const [status, setStatus] = useState("")
  
  const card = (
    <React.Fragment>
    <CardContent>
    <Typography variant="h4" component="div">Cadastrar-se</Typography>
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
      >
        <TextField
          required
          id="standard-required"
          label="Nome"
          variant="standard"
          />
        <TextField
          required
          id="standard-required"
          label="Sobrenome"
          variant="standard"
          />
        <TextField
          required
          id="standard-required"
          label="Email"
          variant="standard"
          />
        <TextField
          required
          id="standard-required"
          label="Telefone"
          variant="standard"
          />
        <TextField
          required
          id="standard-required"
          label="Data Nascimento"
          type="date"
          variant="standard"
          />
        <TextField
          required
          id="standard-password-input"
          label="Senha"
          type="password"
          autoComplete="current-password"
          variant="standard"
          />
        <TextField
          required
          id="standard-password-input"
          label="Confirmar Senha"
          type="password"
          autoComplete="current-password"
          variant="standard"
          />
    </Box>

    </CardContent>
    <CardActions>
      <ButtonMid text="Cancelar"/>
      <ButtonMid text="Cadastrar-se"/>
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