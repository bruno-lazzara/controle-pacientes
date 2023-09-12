import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import http from '../../http';

export default function Login() {
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const credenciais = {
            email: data.get('email'),
            senha: data.get('senha')
        }

        try {
            const result = await http.request({
                url: '/usuarios/autenticar',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: credenciais
            });

            localStorage.setItem('access-token', result.data.token);

            setRedirect(true);
        } catch (err) {
            alert('Email ou senha incorretos');   
        }
    };
    
    useEffect(() => {
        if (localStorage.getItem('access-token')) {
            setRedirect(true);
            return;
        }
        localStorage.clear();
    }, []);

    if (redirect) {
        return <Navigate to={`/admin/sessoes`} />
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Acompanhamento de Pacientes
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        type='email'
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="senha"
                        label="Senha"
                        type="password"
                        id="senha"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Log In
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}