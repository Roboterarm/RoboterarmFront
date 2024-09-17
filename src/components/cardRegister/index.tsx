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
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';



export default function CardRegister() {  
  const navigate = useNavigate(); 

  const [name, setName] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameComplete, setNameComplete] = useState("");

  const register = async () => {
    
    if(!name || !sobrenome || !email || !telefone || !password || !confirmPassword)
      return console.error("Nem todos os campos foram preenchidos")

    setNameComplete(name.trim() + " " + sobrenome.trim())

    console.log(nameComplete) //retirar depois

    if (confirmPassword !== password)
        return console.error("Senha está diferente do Confirmar Senha")


    try {
        const response = await axios.post('http://localhost:3000/user/register', {
            nameComplete,
            email,
            telefone,
            password,
        });
        if (response.status === 200) {
            console.log("Usuário cadastrado com sucesso!");
            navigate('/');
        } else {
            console.error("Erro ao fazer cadastro:", response.data.message);
        }
    } catch (error) {
        console.error("Erro ao fazer cadastro:", error);
        // alert("Os dados não conferem!") refazer alert
    }
};


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
          label="Nome"
          variant="standard"
          sx={{margin: "10px 80px"}}
          onChange={(e) => setName(e.target.value)}
          />
        <TextField
          required
          label="Sobrenome"
          variant="standard"
          sx={{margin: "10px 80px"}}
          onChange={(e) => setSobrenome(e.target.value)}
          />
        <TextField
          required
          label="Email"
          variant="standard"
          sx={{margin: "10px 80px"}}
          onChange={(e) => setEmail(e.target.value)}
          />
        <TextField
          required
          label="Telefone"
          variant="standard"
          sx={{margin: "10px 80px"}}
          onChange={(e) => setTelefone(e.target.value)}
          />
        {/* <DateField label="Data Nascimento"/> */}
        <TextField
          required
          label="Senha"
          type="password"
          autoComplete="current-password"
          variant="standard"
          sx={{margin: "10px 80px"}}
          onChange={(e) => setPassword(e.target.value)}
          />
        <TextField
          required
          label="Confirmar Senha"
          type="password"
          autoComplete="current-password"
          variant="standard"
          sx={{margin: "10px 80px"}}
          onChange={(e) => setConfirmPassword(e.target.value)}
          />
    </Box>
    </CardContent>
    <CardActions sx={{justifyContent: "center"}}>
        <Button variant="contained" sx={{ width: "140px", height: "50px", margin: "20px"}}>Voltar</Button>
        <Button variant="outlined" sx={{ width: "140px", height: "50px", margin: "20px 30px"}} onClick={register}>Cadastrar-se</Button>
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