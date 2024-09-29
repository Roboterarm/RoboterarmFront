import Button from '@mui/material/Button/Button';
import { useNavigate } from 'react-router-dom';

export default function ButtonNavigation( {path, text}:{path: string , text?: string}) {
    const navigate = useNavigate(); 
  return (
        <Button variant="contained" sx={{ width: "140px", height: "50px", margin: "10px" }} onClick={() => navigate(path)}>{text}</Button>
  );
}

{/* <Button variant="outlined" sx={{ width: "140px", height: "50px", margin: "20px 30px" }} type="submit" onClick={login}>Entrar</Button> */}
