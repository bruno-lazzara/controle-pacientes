import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import http from '../../http';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Container, CssBaseline, Box, Avatar, Typography, TextField, Button } from '@mui/material';
import Loading from '../../components/Loading';
import { useSetRecoilState } from 'recoil';
import { carregandoState } from '../../state/atom';

export default function Login() {
    const [redirect, setRedirect] = useState(false);
    const setCarregando = useSetRecoilState(carregandoState);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setCarregando(true);

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
        setCarregando(false);
    };
    
    useEffect(() => {
        setCarregando(true);
        if (localStorage.getItem('access-token')) {
            setRedirect(true);
            return;
        }
        localStorage.clear();
        setCarregando(false);
    }, [setCarregando]);

    if (redirect) {
        return <Navigate to={`/admin/sessoes`} />
    }

    return (
        <Container component="main" maxWidth="xs">
            <Loading />
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
                    Controle de Pacientes
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