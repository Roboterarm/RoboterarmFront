import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from '@mui/material/Alert/Alert';
import Snackbar from '@mui/material/Snackbar/Snackbar';
import Link from '@mui/material/Link/Link';


export default function CardLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const login = async () => {

    if (!email || !password) {
      setErrorMessage("Email e senha são obrigatórios");
      return;
    }
    // Email Validation
    if(!email.includes("@") || email.length < 8 || email.length > 30){
      setErrorMessage('Email é invalido');
      return false;
    }
    // Senha Validation
    if(password.length < 8 || password.length > 30){
      setErrorMessage('A Senha é invalida');
      return false;
    }

    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.post('http://localhost:3000/auth/login', {
        email: email,
        pass: password
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      sessionStorage.setItem('token', response.data.accessToken)
      sessionStorage.setItem('refresh', response.data.refreshToken)

      if (response.status === 200) {
        setOpen(true);
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      }
      else if (response.status === 401) {
        setErrorMessage('Usuário ou senha incorretos');
        return false;
      }
      else {
        console.error("Erro ao fazer login:", response.data.message);
        setErrorMessage("Erro inesperado. Tente novamente mais tarde.");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setErrorMessage('Usuário não encontrado');
      } else {
        console.error("Erro ao fazer login server", error);
        setErrorMessage("Usuário não encontrado.");
      }
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
        <Box sx={{
          display: 'grid',
          alignItems: 'flex-start',
          flexDirection: 'column',
          p: 1,
          m: 1,
          borderRadius: 1,
          textAlign: "center",
        }}>
          <Typography variant="h1" component="div" sx={{ fontSize: "60px", margin: '10px' }}>Login</Typography>
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
          <Link href="" onClick={() => navigate("/recoverypassword")} underline="hover">esqueceu a senha?</Link>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button variant="contained" sx={{ width: "140px", height: "50px", margin: "20px" }} onClick={() => navigate("/register")}>Cadastrar-se</Button>
        <Button variant="outlined" sx={{ width: "140px", height: "50px", margin: "20px 30px" }} type="submit" onClick={login}>Entrar</Button>
      </CardActions>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={1000}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Login realizado com sucesso!
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
  return (
    <Paper>
      <Box sx={{ minWidth: 275, borderRadius: "100px" }}>
        <Card variant="outlined">{card}</Card>
      </Box>
    </Paper>
  );
}