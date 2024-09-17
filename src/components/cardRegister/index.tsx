import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import DateField from '../dateField';
import Button from '@mui/material/Button/Button';

export default function CardRegister() {  
  const card = (
    <React.Fragment>
    <CardContent>
    <Typography variant="h1" component="div" sx={{textAlign: "center", fontSize: "40px"}}>Cadastrar-se</Typography>
    <Box sx={{
          display: 'grid',
          flexDirection: 'column',
          borderRadius: 1,
          textAlign: "center",
          margin: "40px 20px"
        }}>
        <TextField
          required
          id="standard-required"
          label="Nome"
          variant="standard"
          sx={{margin: "10px 80px"}}
          />
          
        <TextField
          required
          id="standard-required"
          label="Sobrenome"
          variant="standard"
          sx={{margin: "10px 80px"}}
          />
        <TextField
          required
          id="standard-required"
          label="Email"
          variant="standard"
          sx={{margin: "10px 80px"}}
          />
        <TextField
          required
          id="standard-required"
          label="Telefone"
          variant="standard"
          sx={{margin: "10px 80px"}}
          />
        {/* <DateField label="Data Nascimento"/> */}
        <TextField
          required
          id="standard-password-input"
          label="Senha"
          type="password"
          autoComplete="current-password"
          variant="standard"
          sx={{margin: "10px 80px"}}
          />
        <TextField
          required
          id="standard-password-input"
          label="Confirmar Senha"
          type="password"
          autoComplete="current-password"
          variant="standard"
          sx={{margin: "10px 80px"}}
          />
    </Box>
    </CardContent>
    <CardActions sx={{justifyContent: "center"}}>
        <Button variant="contained" sx={{ width: "140px", height: "50px", margin: "20px"}}>Voltar</Button>
        <Button variant="outlined" sx={{ width: "140px", height: "50px", margin: "20px 30px"}}>Cadastrar-se</Button>
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