import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button/Button';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar/Snackbar';
import { set } from 'firebase/database';



export default function CardRegister() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Validação dos Inputs

  const formatPhone = (value: any) => {
    if (value.length <= 2) return value;
    if (value.length <= 6) return `(${value.slice(0, 2)}) ${value.slice(2)}`;
    return `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6, 10)}`;
  };

  useEffect(() => {
    const upperCase = (str: any) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    setFullName(`${upperCase(name.trim())} ${upperCase(lastname.trim())}`);
  }, [name, lastname]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);


  const validateInputs = () => {

    if (!name || !lastname || !email || !phone || !password || !confirmPassword) {
      setErrorMessage('Todos os campos devem ser preenchidos!');
      return false;
    }
    if (password !== confirmPassword) {
      setErrorMessage('As senhas não coincidem!');
      return false;
    }

    // Name Validation
    if (name.length < 2) {
      setErrorMessage('Seu nome deve conter no mínimo dois caracteres');
      return false;
    };
    if (name.length > 15) {
      setErrorMessage('Seu nome deve conter no máximo 15 caracteres');
      return false;
    };

    // Lastname Validation
    if (lastname.length < 2) {
      setErrorMessage('Seu sobrenome deve conter no mínimo 2 caracteres');
      return false;
    }
    if (lastname.length > 30) {
      setErrorMessage('Seu sobrenome deve conter no máximo 30 caracteres');
      return false;
    };

    // Email Validation
    if(!email.includes("@")){
      setErrorMessage('Seu email é invalido');
      return false;
    }
    // Fazer validação para caso já existir um email igual no banco

    // Password Validation
    if(password.length < 8){
      setErrorMessage('Sua Senha deve conter mais de 8 caracteres');
      return false;
    }
    if(password.length < 8){
      setErrorMessage('Sua Senha deve conter no máximo 30 caracteres');
      return false;
    }

    // Caso estiver tudo correto
    return true;
  };

  const register = async () => {

    setPhone(formatPhone(phone))
    if (!validateInputs()) return;

    try {
      const response = await axios.post('http://localhost:3000/user/register', {
        name: fullName,
        email: email,
        phone: phone,
        password: password,
      });

      if (response.status === 201) {
        setOpen(true);
        setTimeout(() => {
          navigate('/');
        }, 2000);

      } else {
        setErrorMessage(response.data.message || 'Erro ao fazer cadastro.');
      }
    } catch (error) {
      setErrorMessage('Erro ao fazer cadastro!');
      console.error('Erro ao fazer cadastro!', error);
    }
  };





  const card = (
    <React.Fragment>
      {errorMessage && (
        <Alert
          severity="error"
          sx={{
            position: 'fixed',
            top: '100px',
            left: '50%',   
            transform: 'translateX(-50%)',
            zIndex: 1000,
          }}
        >
          {errorMessage}
        </Alert>
      )}
      <CardContent>
        <Typography variant="h1" component="div" sx={{ textAlign: "center", fontSize: "40px" }}>Cadastrar-se</Typography>
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
            sx={{ margin: "10px 80px" }}
            onChange={(e) => { setName(e.target.value); setFullName(name.trim() + " " + lastname.trim()) }}
          />
          <TextField
            required
            label="Sobrenome"
            variant="standard"
            sx={{ margin: "10px 80px" }}
            onChange={(e) => { setLastname(e.target.value), setFullName(name.trim() + " " + lastname.trim()) }}
          />
          <TextField
            required
            label="Email"
            variant="standard"
            sx={{ margin: "10px 80px" }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            required
            label="Telefone"
            variant="standard"
            sx={{ margin: "10px 80px" }}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
            placeholder="(00) 0000-0000"
          />
          <TextField
            required
            label="Senha"
            type="password"
            autoComplete="current-password"
            variant="standard"
            sx={{ margin: "10px 80px" }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            required
            label="Confirmar Senha"
            type="password"
            autoComplete="current-password"
            variant="standard"
            sx={{ margin: "10px 80px" }}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button href="/" variant="contained" sx={{ width: "140px", height: "50px", margin: "20px" }} onClick={() => navigate("/")}>Voltar</Button>
        <Button variant="outlined" sx={{ width: "140px", height: "50px", margin: "20px 30px" }} onClick={register}>Cadastrar-se</Button>
      </CardActions>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={1000}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Cadastro realizado com sucesso!
        </Alert>
      </Snackbar>
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